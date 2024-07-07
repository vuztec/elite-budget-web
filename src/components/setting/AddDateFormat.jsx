import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import axios from "../../config/axios";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const AddDateFormat = ({ open, setOpen, recordData, serverUrl }) => {
  const defaultValues = recordData;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    const updatedData = data;
    setIsLoading(() => true);

    try {
      delete data.id;
      const response = await axios.put(
        `${serverUrl}/api/dateformat/${numericSelectedID}`,
        data
      );
      if (response.status === 201 || response.status === 203) {
        // Adjusted status code check
        // Handle success
        setIsLoading(() => false);

        console.log("Date Format updated successfully");
        //data.id = recordData.id;
        setOpen(false);
      } else {
        // Handle error
        setIsLoading(() => false);

        console.error("Failed to update date format");
      }
    } catch (error) {
      setIsLoading(() => false);

      console.error("Error:", error);
    }
  };

  const Format = [
    "dd.MM.yyyy",
    "dd/MM/yyyy",
    "ddd, dd MMM yyyy",
    "ddd, dd MMMM yyyy",
    "dddd, dd MMM yyyy",
    "dddd, dd MMMM yyyy",
    "dd-MMM-yy",
    "dd-MMM-yyyy",
    "MM.dd.yyyy",
    "MM/dd/yyyy",
    "MM-dd-yyyy",
    "MMM dd, yyyy",
    "yy.MM.dd",
    "yy/MM/dd",
    "yy-MM-dd",
    "yyyy.MM.dd",
    "yyyy/MM/dd",
    "yyyy-MM-dd",
  ];

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Select
              placeholder="Select Date Format"
              name="Format"
              label="Date Format"
              options={Format.map((format) => ({
                value: format,
                label: format,
              }))}
              className="w-full rounded"
              register={register("Format", {
                required: "The field is required!",
              })}
              error={errors.Format ? errors.Format.message : ""}
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

export default AddDateFormat;
