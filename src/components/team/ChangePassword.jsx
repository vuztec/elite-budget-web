import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { toast } from "react-toastify";

export const ChangePassword = ({ open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("NewPassword");

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);
    const id = toast.loading("Loading....");

    axios
      .patch("/api/auth/password", data)
      .then(({ data }) => {
        setIsLoading(() => false);

        toast.update(id, {
          render: "Password Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        console.log("Password updated successfully");
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(() => false);
        toast.update(id, {
          render: handleAxiosResponseError(error),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-10">
            CHANGE PASSWORD
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Textbox
              placeholder="Enter Current Password"
              type="password"
              name="CurrentPassword"
              label="Current Password"
              className="w-full rounded"
              register={register("CurrentPassword", {
                required: "Current Password is required!",
              })}
              error={errors.CurrentPassword ? errors.CurrentPassword.message : ""}
            />

            <Textbox
              placeholder="Enter New Password"
              type="password"
              name="NewPassword"
              label="New Password"
              className="w-full rounded"
              register={register("NewPassword", {
                required: "New Password is required!",
              })}
              error={errors.NewPassword ? errors.NewPassword.message : ""}
            />

            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="ConfirmPassword"
              label="Confirm Password"
              className="w-full rounded"
              register={register("ConfirmPassword", {
                required: "Confirm Password is required!",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              error={errors.ConfirmPassword ? errors.ConfirmPassword.message : ""}
            />
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
