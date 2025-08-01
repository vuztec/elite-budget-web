import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';
import useUserStore from '../../app/user';
import axios from '../../config/axios';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { AddRootUser } from '../../components/team';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  //const user = false
  const { user } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const setJwt = useUserStore((state) => state.setJwt);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/');
  }, [user]);

  const submitHandler = async (data) => {
    const Email = data.email;
    const Password = data.password;
    const id = toast.loading('Loading....');

    // Perform API call to check if the username and password match
    axios
      .post('/api/auth/login', {
        Email,
        Password,
      })
      .then(({ data }) => {
        // setUser(data.user);
        // setJwt(data.jwt);
        toast.update(id, {
          render: 'Otp sent successfully on your email.',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        navigate(`/otp?email=${Email}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) navigate('/denied');
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
              <div className="flex flex-col items-center">
                <p className="text-black text-3xl font-bold text-center">Welcome back!</p>
                <p className="text-center text-base text-gray-700 ">Keep your login credentials safe</p>
                <p className="text-center text-xs text-red-700 w-72">
                  For the best user experience, we recommend using Google Chrome or Microsoft Edge.
                </p>
              </div>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="joe@company.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register('email', {
                    required: 'Email Address is required!',
                  })}
                  error={errors.email ? errors.email.message : ''}
                />
                <div className="flex items-center justify-center relative w-full">
                  <div className="w-full">
                    <Textbox
                      placeholder="your password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      className="w-full rounded-full pr-10" // Add padding for icon
                      register={register('password', {
                        required: 'Password is required!',
                      })}
                      error={errors.password ? errors.password.message : ''}
                    />
                  </div>

                  {/* Toggle icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[40px] lg:top-[45px] transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-5 xl:gap-10 w-full mt-5">
                  <div className="flex justify-between">
                    <a
                      href="/forgetpassword"
                      className="text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <a
                    href="/signup"
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    Create New Account?
                  </a>
                </div>

                <Button
                  type="submit"
                  label="Submit"
                  className={clsx('w-full h-10 hover:bg-green-800 text-white rounded-full bg-black')}
                />

                <div className="flex items-center justify-center gap-5 mt-5">
                  <a
                    href="/privacy-policy"
                    // target="_blank"
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-and-conditions"
                    // target="_blank"
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    Terms & Conditions
                  </a>
                  <a
                    href="/about-elite"
                    //target="_blank"
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    About Elite
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <AddRootUser setUser={setUser} open={open} setOpen={setOpen} key={`UP${new Date().getTime().toString()}`} />
      </div>
    </>
  );
};
