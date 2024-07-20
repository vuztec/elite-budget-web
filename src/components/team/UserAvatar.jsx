import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils";
import useUserStore from "../../app/user";
import AddRootUser from "./AddRootUser";
import { AddRegularUser, ChangePassword } from "../team";
import { useQueryClient } from "react-query";

export const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openPassword, setOpenPassword] = useState(false);
  const { user, setJwt, setUser, setIsRefresh } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutHandler = () => {
    setUser(null, null);
    setJwt(null);
    setIsRefresh(true);
    queryClient.clear();
    navigate("/login");
  };

  const editClick = (el) => {
    // navigate("/profile");
    setSelected(el);
    setOpen(true);
  };

  const editPasswordClick = (el) => {
    console.log("User:", el);
    setSelected(el);
    setOpenPassword(true);
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-black">
              <span className="text-white font-semibold">{getInitials(user?.FullName)}</span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => editClick(user)}
                      className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => editPasswordClick(user)}
                      className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <ChangePassword
        setUser={setUser}
        open={openPassword}
        setOpen={setOpenPassword}
        recordData={selected}
        key={`CP${new Date().getTime().toString()}`}
      />
      <AddRootUser setUser={setUser} open={open} setOpen={setOpen} recordData={selected} key={`UP${new Date().getTime().toString()}`} />
    </>
  );
};

export default UserAvatar;
