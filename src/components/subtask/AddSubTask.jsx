import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient } from "react-query";
import { dateFormatter } from "../../utils";
import { TiCancel } from "react-icons/ti";
import { IoMdSend } from "react-icons/io";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddSubTask = ({ open, setOpen, recordData, socket, type, itemID, query, chatUsers }) => {
  const queryClient = useQueryClient();
  // type will tell us the column and itemID which main item the subtask belongs to. UpdatedBy is currentUser.id
  let defaultValues = recordData
    ? {
        ...recordData,
        DueDate: recordData?.DueDate ? dateFormatter(recordData?.DueDate) : "",
      }
    : {};

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    try {
      if (!data.id) {
        axios
          .post(SERVER_URL + "/api/subtask", { task: { ...data, [type]: Number(itemID) }, type, query, chatUsers, itemID })
          .then(({ data }) => {
            const subtask = data.items;
            queryClient.setQueryData(["subtasks", type, Number(itemID)], (prev) => {
              const isTrue = prev?.find((task) => task.id === subtask.id);

              if (!isTrue) {
                queryClient.setQueryData([query], (prev) =>
                  prev.map((item) =>
                    item.id === Number(itemID)
                      ? {
                          ...item,
                          _count: {
                            ...item._count,
                            subtaskdb: item._count.subtaskdb + 1,
                          },
                        }
                      : item
                  )
                );
                return prev ? [subtask, ...prev] : [subtask];
              } else return prev;
            });
            setOpen(false);
            setIsLoading(() => false);
          })
          .catch((err) => {
            setIsLoading(() => false);

            console.log(handleAxiosResponseError(err));
          });
      } else {
        // If 'id' is present
        delete data.id;

        socket?.emit("updateSubtask", data, recordData.Status !== data.Status, numericSelectedID, type, itemID, chatUsers);

        axios
          .put(SERVER_URL + "/api/subtask/" + numericSelectedID, {
            data,
            is_status_change: recordData.Status !== data.Status,
            type,
            chatUsers,
            itemID,
          })
          .then(({ data }) => {
            console.log(data);
            queryClient.setQueryData(["subtasks", type, parseInt(itemID)], (prev) =>
              prev?.map((subtask) => (subtask.id === numericSelectedID ? data.items : subtask))
            );
            setOpen(false);
            setIsLoading(() => false);
          })
          .catch((err) => {
            setIsLoading(() => false);

            console.log(handleAxiosResponseError(err));
          });
      }
    } catch (error) {
      setIsLoading(() => false);

      console.error("Error:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE SUB-TASK" : "ADD NEW SUB-TASK"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Textbox
              placeholder="Enter Description"
              type="text"
              name="Description"
              label="Sub Task"
              className="w-full rounded"
              register={register("Description", {
                required: "Description is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Select
                  name="Status"
                  label="Status"
                  options={[
                    { value: "To-Do", label: "To-Do" },
                    { value: "In-Progress", label: "In-Progress" },
                    { value: "Completed", label: "Completed" },
                  ]}
                  className="w-full rounded"
                  register={register("Status", {
                    required: "Status is required!",
                  })}
                  error={errors.name ? errors.name.message : ""}
                />
              </div>

              <div className="flex-1">
                <Textbox
                  placeholder="Select Due Date"
                  type="date"
                  name="DueDate"
                  label="Due Date"
                  className="w-full rounded"
                  register={register("DueDate", {
                    valueAsDate: true,
                  })}
                  error={errors.name ? errors.name.message : ""}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
              <Button
                type="submit"
                className="w-fit flex flex-row-reverse items-center gap-1 text-white"
                label="Submit"
                icon={<IoMdSend />}
              />

              <Button
                type="button"
                className="bg-pink-200 flex flex-row-reverse items-center gap-1 text-gray-900"
                onClick={() => setOpen(false)}
                label="Cancel"
                icon={<TiCancel />}
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;
