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

export const Login = () => {
  //const user = false
  const { user } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const setJwt = useUserStore((state) => state.setJwt);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/dashboard');
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
        setUser(data.user);
        setJwt(data.jwt);
        toast.update(id, {
          render: data.message,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        navigate('/dashboard');
      })
      .catch((err) => {
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const addClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
          {/* left side */}
          {/* <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
              Manage all your business activities in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-[#00ABBD]'>
              <span>Cloud-Based</span>
              <span>ERP</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div> */}

          {/* right side */}
          <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
            >
              <div className="">
                <p className="text-black text-3xl font-bold text-center">Welcome back!</p>
                <p className="text-center text-base text-gray-700 ">Keep your login credentials safe</p>
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
                <Textbox
                  placeholder="your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register('password', {
                    required: 'Password is required!',
                  })}
                  error={errors.password ? errors.password.message : ''}
                />
                <div className="flex items-center justify-center gap-5 xl:gap-10 w-full mt-5">
                  <div className="flex justify-between">
                    <a
                      href="/forgetpassword"
                      className="text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div
                    onClick={() => addClick()}
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    Create New Account?
                  </div>
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
                    href="https://www.elitecashflowconsulting.com/"
                    target="_blank"
                    className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                  >
                    About Us
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
