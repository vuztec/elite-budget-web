import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient } from "react-query";
import axios from "../../config/axios";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import fileExtension from "../../utils/file.extension";
import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddAttachment = ({ open, setOpen, recordData, socket, type, itemID, query, chatUsers }) => {
  const queryClient = useQueryClient();
  // type will tell us the column and itemID which main item the attachment belongs to. UpdatedBy is currentUser.FullName
  let defaultValues = recordData;

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    socket?.on("attachmentAdded", (attachment, type, id, query) => {
      console.log("Attachment added : ", attachment, type, id);
    });

    return () => {
      socket?.off("attachmentAdded");
    };
  }, []);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (postdata) => {
    const formData = new FormData();
    setIsLoading(() => true);
    const filedata = postdata.file[0].name.split(".");
    const extension = filedata[filedata.length - 1];

    if (!fileExtension.includes(extension)) return toast.warning("File format does not support");

    formData.append("file", postdata.file[0]);

    axios
      .post(SERVER_URL + "/api/attachment/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        axios
          .post(SERVER_URL + "/api/attachment", {
            attachment: {
              [type]: Number(itemID),
              Description: postdata.Description,
              Revision: postdata.Revision,
              RefNum: postdata.RefNum,
              FileSize: postdata.file[0].size,
              AttachPath: data.items,
            },
            type,
            itemID,
            query,
            chatUsers,
          })
          .then(({ data }) => {
            console.log("Data --- ", data);
            const attachment = data.items;

            queryClient.setQueryData(["attachments", type, Number(itemID)], (prev) => {
              const isTrue = prev?.find((attach) => attach.id === attachment.id);

              if (!isTrue) {
                queryClient.setQueryData([query], (prev) =>
                  prev.map((item) =>
                    item.id === Number(itemID)
                      ? {
                          ...item,
                          _count: {
                            ...item._count,
                            attachmentdb: item._count.attachmentdb + 1,
                          },
                        }
                      : item
                  )
                );
                return prev ? [attachment, ...prev] : [attachment];
              } else return prev;
            });

            setIsLoading(() => false);
            setOpen(false);
          })
          .catch((err) => {
            setIsLoading(() => false);
            console.log("Error --- ", err);
          });
      })
      .catch((err) => {
        setIsLoading(() => false);
        console.log("Error --- ", err);
      });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE FILE" : "ADD NEW FILE"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="">
                <Textbox
                  placeholder="Enter File Name"
                  type="text"
                  name="Description"
                  label="File Name"
                  className="w-full rounded"
                  register={register("Description", {
                    required: "Description is required!",
                  })}
                  error={errors.Description ? errors.Description.message : ""}
                />
              </div>
              <div className="">
                <Textbox
                  placeholder="Reference No"
                  type="text"
                  name="RefNum"
                  label="Reference No"
                  className="w-full rounded"
                  register={register("RefNum", {
                    required: "RefNum is required!",
                  })}
                  error={errors.RefNum ? errors.RefNum.message : ""}
                />
              </div>
              <div className="">
                <Textbox
                  placeholder="Revision"
                  type="text"
                  name="Revision"
                  label="Revision"
                  className="w-full rounded"
                  register={register("Revision", {
                    required: "RefNum is required!",
                  })}
                  error={errors.Revision ? errors.Revision.message : ""}
                />
              </div>
              <div className="">
                <Textbox
                  placeholder="Select file..."
                  type="file"
                  name="file"
                  label="File"
                  className="w-full rounded"
                  register={register("file", {
                    required: "File is required!",
                  })}
                  error={errors.file ? errors.file.message : ""}
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

export default AddAttachment;
