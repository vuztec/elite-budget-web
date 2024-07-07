import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient } from "react-query";
import { dateFormatter } from "../../utils";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const AddHoliday = ({ open, setOpen, recordData, socket }) => {
  const queryClient = useQueryClient();

  const defaultValues = recordData
    ? {
        ...recordData,
        Holiday: recordData?.Holiday ? dateFormatter(recordData?.Holiday) : "",
      }
    : {};
  const currentUser = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    socket?.on("holidayAdded", (holiday) => {
      console.log("Holiday added : ", holiday);
      setIsLoading(() => false);

      queryClient.setQueryData(["holiday"], (prevHolidays) => (prevHolidays ? [...prevHolidays, holiday] : [holiday]));
      setOpen(false);
    });

    socket?.on("holidayUpdated", (updatedHoliday, id) => {
      console.log("updated holiday :", updatedHoliday);
      setIsLoading(() => false);

      queryClient.setQueryData(["holiday"], (prevHolidays) =>
        prevHolidays.map((holiday) => (holiday.id === id ? updatedHoliday : holiday))
      );
      setOpen(false);
    });

    return () => {
      socket?.off("holidayAdded");
      socket?.off("holidayUpdated");
    };
  }, []);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    try {
      if (!data.id) {
        // If 'id' is not present, it's a new new holiday, so we add 'RootID' & 'UserID' and use POST method
        data.RootID = currentUser.RootID;
        data.UserID = currentUser.id;
        socket?.emit("addHoliday", data);
      } else {
        // If 'id' is present, it's an update, so we remove 'RootID' and 'id' and use PUT method
        delete data.RootID;
        delete data.id;
        delete data.UserID;
        socket?.emit("updateHoliday", data, numericSelectedID);
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
            {recordData ? "UPDATE HOLIDAY" : "ADD NEW HOLIDAY"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-auto">
                <Textbox
                  placeholder="Enter Holiday"
                  type="text"
                  name="Description"
                  label="Holiday"
                  className="w-full rounded"
                  register={register("Description", {
                    required: "Full name is required!",
                  })}
                  error={errors.Description ? errors.Description.message : ""}
                />
              </div>
              <div className="flex-auto">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="Holiday"
                  label="Date"
                  className="w-full rounded"
                  register={register("Holiday", {
                    valueAsDate: true,
                  })}
                  error={errors.Holiday ? errors.Holiday.message : ""}
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

export default AddHoliday;
