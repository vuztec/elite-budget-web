import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient } from "react-query";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const AddWeekStart = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  const defaultValues = recordData;
  const currentUser = useUserStore((state) => state.user);

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
        // If 'id' is not present, it's a new new holiday, so we add 'RootID' & 'UserID' and use POST method
        data.RootID = currentUser.RootID;
        data.UserID = currentUser.id;
      } else {
        // If 'id' is present, it's an update, so we remove 'RootID' and 'id' and use PUT method
        delete data.RootID;
        delete data.id;
        delete data.UserID;
      }
    } catch (error) {
      setIsLoading(() => false);

      console.error("Error:", error);
    }
  };

  const Weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE WEEKDAY" : "ADD NEW WEEKDAY"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Select
              placeholder="Select Weekday"
              name="Weekday"
              label="Weekday"
              options={Weekday.map((weekday) => ({
                value: weekday,
                label: weekday,
              }))} // Map weekday array to options
              className="w-full rounded"
              register={register("Weekday", {
                required: "Weekday is required!",
              })}
              error={errors.Weekday ? errors.Weekday.message : ""}
            />
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

export default AddWeekStart;
