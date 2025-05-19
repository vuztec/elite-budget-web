import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Loading from '../Loader';
import Button from '../Button';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';

export const ChangePassword = ({ open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('NewPassword');

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);
    const id = toast.loading('Loading....');

    delete data.ConfirmPassword;

    axios
      .patch('/api/auth/password', data)
      .then(({ data }) => {
        setIsLoading(() => false);

        console.log('Data : ', data);

        toast.update(id, {
          render: 'Password Updated Successfully',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        setOpen(false);
      })
      .catch((err) => {
        console.log('Error : ', err);
        setIsLoading(() => false);
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-10">
            CHANGE PASSWORD
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex items-center justify-center relative w-full">
              <div className="w-full">
                <Textbox
                  placeholder="Enter Current Password"
                  type={showPassword1 ? 'text' : 'password'}
                  name="CurrentPassword"
                  label="Current Password"
                  className="w-full rounded"
                  register={register('CurrentPassword', {
                    required: 'Current Password is required!',
                  })}
                  error={errors.CurrentPassword ? errors.CurrentPassword.message : ''}
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
                  placeholder="Enter New Password"
                  type={showPassword2 ? 'text' : 'password'}
                  name="NewPassword"
                  label="New Password"
                  className="w-full rounded"
                  register={register('NewPassword', {
                    required: 'New Password is required!',
                  })}
                  error={errors.NewPassword ? errors.NewPassword.message : ''}
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
            <div className="flex items-center justify-center relative w-full">
              <div className="w-full">
                <Textbox
                  placeholder="Confirm New Password"
                  type={showPassword3 ? 'text' : 'password'}
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
                onClick={() => setShowPassword3((prev) => !prev)}
                className="absolute right-3 top-[40px] lg:top-[45px] transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword3 ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className={clsx('w-full h-10 hover:bg-green-800 text-white rounded-full bg-black')}
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
