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
const Welcome = () => {
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
            <div className="form-container w-full md:w-[700px] flex flex-col items-center gap-y-8 bg-[#C6EFCE] px-10 pt-14 pb-14">
              <div className="text-center text-[#006100]">
                <p className="text-3xl font-bold">Your account was created successfully</p>
                <p className="text-sm font-bold mt-5">Please use your email/username and password to login</p>
              </div>
              <div className="w-fit">
                <Button
                  type="button"
                  className={clsx('w-fit h-10 hover:bg-green-800 text-white rounded-full bg-black uppercase')}
                  label="Login Page"
                  onClick={() => navigate('/login')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
