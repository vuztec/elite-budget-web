import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

export const AddCurrency = ({ open, setOpen, recordData, socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateRoot, user, updateUserData } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { Currency: recordData?.Currency } });

  useEffect(() => {
    socket?.on("currencyUpdated", (data) => {
      console.log("updated currency :", data);
      setIsLoading(() => false);
      if (user.Type === "Root") updateUserData(data);
      updateRoot(data);
      setOpen(false);
    });

    return () => {
      socket?.off("currencyUpdated");
    };
  }, []);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    // setIsLoading(() => true);
    try {
      socket?.emit("updateCurrency", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {recordData ? "UPDATE CURRENCY" : "ADD NEW CURRENCY"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Textbox
              placeholder="Enter Currency"
              type="text"
              name="Currency"
              label="Currency"
              className="w-full rounded"
              register={register("Currency", {
                required: "Currency is required!",
              })}
              error={errors.Currency ? errors.Currency.message : ""}
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
