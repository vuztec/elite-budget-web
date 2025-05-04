import React from 'react';
import { useForm } from 'react-hook-form';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';
import axios from '../../config/axios';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = (postdata) => {
    const id = toast.loading('Loading....');

    axios
      .post('/api/auth/forget-password', { Email: postdata.email })
      .then(({ data }) => {
        toast.update(id, {
          render: data.message,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        navigate(`/otp?email=${postdata.email}&type=reset`);
      })
      .catch((err) => {
        console.log(err);
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
                <p className="text-black text-3xl font-bold text-center">Forgot Password?</p>
                <p className="text-center text-base text-gray-700 ">Enter your email.</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register('email', {
                    required: 'Email Address is required!',
                  })}
                  error={errors.email ? errors.email.message : ''}
                />

                <Button
                  type="submit"
                  label="Submit"
                  className={clsx('w-full h-10 hover:bg-green-800 text-white rounded-full bg-black')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
