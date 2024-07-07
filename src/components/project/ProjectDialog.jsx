import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddProject from "./AddProject";
import socket from "../../utils/socket";
import ConfirmationDialog from "../Dialogs";
import { useQueryClient } from "react-query";
import { FaEdit } from "react-icons/fa";
import { getSuperProjectPermission, getEditProjectPermission } from "../../utils/permissions";
import useUserStore from "../../app/user";

export const ProjectDialog = ({ project }) => {
  const { user, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    socket?.on("projectDeleted", (projectId) => {
      console.log("Project id ---------", projectId);
      queryClient.setQueryData(["projects"], (prev) => prev.filter((project) => project.id !== projectId));
      setOpenDialog(false);
    });

    return () => {
      socket?.off("projectDeleted");
    };
  }, []);

  const deleteHandler = async (selected) => {
    try {
      socket?.emit("deleteProject", selected);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/project/${id}`);
  };
  //----------------CRUD----------------//

  const items = [
    (current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && {
      label: "Open Project",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => viewDetailClick(project.id),
    },
    getEditProjectPermission(user, project) && {
      label: "Edit Project",
      icon: <FaEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => editClick(project),
    },
    // {
    //   label: "Duplicate",
    //   icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
    //   onClick: () => duplicateHandler(),
    // },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 ">
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-2 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-0">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
              {getSuperProjectPermission(user) && (
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => deleteClick(project.id)}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-red-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <RiDeleteBin6Line className="mr-2 h-5 w-5 text-red-400" aria-hidden="true" />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddProject socket={socket} open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};

export default ProjectDialog;
