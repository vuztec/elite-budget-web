import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import Loading from '../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../app/user';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setJwt } = useUserStore();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const params = useQuery();
  const otpId = params.get('id');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('password');

  const submitHandler = (data) => {
    const id = toast.loading('Loading....');
    setIsLoading(true);
    axios
      .patch('/api/auth/reset-password', { Password: data.password, otpId: Number(otpId) })
      .then(({ data }) => {
        setIsLoading(false);
        setUser(data.user);
        setJwt(data.jwt);
        navigate(`/`);
        toast.update(id, {
          render: 'Password changed successfully',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: 'error',
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
                <p className="text-black text-3xl font-bold text-center">New Password</p>
              </div>
              <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
                <div className="flex items-center justify-center relative w-full">
                  <div className="w-full">
                    <Textbox
                      placeholder="Enter New Password"
                      type={showPassword1 ? 'text' : 'password'}
                      name="password"
                      label="New Password"
                      className="w-full rounded"
                      register={register('password', {
                        required: 'New Password is required!',
                      })}
                      error={errors.password ? errors.password.message : ''}
                    />
                  </div>
                  {/* Toggle icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword1((prev) => !prev)}
                    className="absolute right-3 top-[40px] lg:top-[45px] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPassword1 ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                  </button>
                </div>
                <div className="flex items-center justify-center relative w-full">
                  <div className="w-full">
                    <Textbox
                      placeholder="Confirm New Password"
                      type={showPassword2 ? 'text' : 'password'}
                      name="ConfirmPassword"
                      label="Confirm Password"
                      className="w-full rounded"
                      register={register('ConfirmPassword', {
                        required: 'Confirm Password is required!',
                        validate: (value) => value === newPassword || 'Passwords do not match',
                      })}
                      error={errors.ConfirmPassword ? errors.ConfirmPassword.message : ''}
                    />
                  </div>
                  {/* Toggle icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword2((prev) => !prev)}
                    className="absolute right-3 top-[40px] lg:top-[45px] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPassword2 ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="py-5">
                  <Loading />
                </div>
              ) : (
                <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
                  <Button
                    type="button"
                    className="bg-gray-300 flex flex-row-reverse items-center gap-1 text-black"
                    label="Cancel"
                    onClick={() => navigate('/login')}
                  />
                  <Button
                    type="submit"
                    className={clsx('w-full h-10 hover:bg-green-800 text-white rounded-full bg-black')}
                    label="Submit"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
