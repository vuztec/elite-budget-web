import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Textbox from "../../components/Textbox";
import Button from "../../components/Button";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import Loading from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useQuery();
  const email = params.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("password");

  const submitHandler = (data) => {
    const id = toast.loading("Loading....");
    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/auth/updatepassword", { password: data.password, email })
      .then(({ data }) => {
        console.log(data);
        setIsLoading(false);
        navigate("/login");
        toast.update(id, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        setIsLoading(false);
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
            >
              <div className="">
                <p className="text-[#00ABBD] text-3xl font-bold text-center">New Password</p>
              </div>
              <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
                <Textbox
                  placeholder="Enter New Password"
                  type="password"
                  name="password"
                  label="New Password"
                  className="w-full rounded"
                  register={register("password", {
                    required: "New Password is required!",
                  })}
                  error={errors.password ? errors.password.message : ""}
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
                <Button
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                  label="Submit"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
