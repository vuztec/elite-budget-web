import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';
import useUserStore from '../../app/user';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { AddRootUser } from '../../components/team';
import { DateFormats } from '../../utils/budget.filter';
import Loading from '../../components/Loader';
import { Country } from 'country-state-city';
import Logo from '../../assets/logo.png';
import Select from '../../components/Select';
import { IoMdSend } from 'react-icons/io';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { PrivacyDialog, TermsDialog } from '../../components/DisplayDialogs';
import { LuMousePointer } from 'react-icons/lu';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getSpecial } from '../../utils/nmrw.function';

export const Signup = () => {
  const CountryData = Country.getAllCountries();
  const { setUser, user, acceptPrivacy, acceptTerms } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate('/');
  }, [user, navigate]);
  const [open, setOpen] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const dateFormats = DateFormats.map((format) => ({
    value: format.value,
    label: format.label,
  }));

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { Country: 'US' },
  });

  const Password = useWatch({ control, name: 'Password' });

  useEffect(() => {
    if (user?.id) {
      setValue('FullName', user.FullName);
      setValue('Email', user.Email);
      setValue('Currency', user.Currency);
      setValue('PartnerAge', user.PartnerAge);
      setValue('SelfAge', user.SelfAge);
      // setValue('Country', user.Country);

      const country = CountryData.find((country) => country.name === user?.Country);

      if (country) {
        setValue('Country', country?.name);
        setValue('Currency', country.currency);
        setValue('Separator', 'en-' + country);
      }
      // setCountryCode(country);
    }

    return () => reset();
  }, [user?.id]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);

    delete data.ConfirmPassword;

    const country = CountryData.find((country) => country.isoCode === data?.Country);

    data.Country = country?.name;
    data.Currency = country?.currency;
    data.Separator = 'en-' + country?.isoCode;

    if (user?.id) {
      const id = toast.loading('Updating User Profile....');
      delete data.Password;
      axios
        .patch('/api/rootusers/' + user.id, data)
        .then(({ data }) => {
          setUser(data);
          setIsLoading(() => false);
          toast.update(id, {
            render: 'Profile Updated Successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          setIsLoading(() => false);

          toast.update(id, {
            render: handleAxiosResponseError(err),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
        });
    } else {
      const id = toast.loading('Loading....');

      axios
        .post('/api/auth/signup', data)
        .then(({ data }) => {
          toast.update(id, {
            render: 'Please login to continue',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          });
          setIsLoading(() => false);
          navigate('/welcome');
        })
        .catch((err) => {
          console.log(err);
          console.log('Error : ', handleAxiosResponseError(err));
          setIsLoading(() => false);

          toast.update(id, {
            render: handleAxiosResponseError(err),
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
        });
    }
  };

  // const handleCountryChange = (e) => {
  //   if (e && e.target?.value) {
  //     const selCountry = e.target?.value;
  //     const targetCountry = CountryData.find((item) => item?.isoCode === selCountry);
  //     setValue('Country', targetCountry.name);
  //     setValue('Currency', targetCountry.currency);
  //     const selCountryCode = targetCountry ? targetCountry.isoCode : '';
  //     setCountryCode(selCountryCode);

  //     setValue('Separator', 'en-' + selCountryCode);
  //   }
  // };

  const handleOpenPrivacy = () => {
    setOpenPrivacy(true);
  };

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col xl:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-[70%] xl:w-[50%] flex gap-0 md:gap-40 flex-col xl:flex-row items-center justify-center">
          <div className="w-full min-h-screen flex items-center justify-center flex-col xl:flex-row bg-[#f3f4f6]">
            <div className="w-full flex gap-8 flex-col items-center justify-center">
              <div className="h-full w-full flex flex-col xl:flex-row items-center justify-center gap-10">
                <div className="w-full xl:w-1/2 flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
                  <h1 className="text-3xl font-bold text-gray-900">CREATE NEW ACCOUNT</h1>
                  <div className="flex flex-col text-center">
                    <p className="w-96">{getSpecial(true)}</p>
                  </div>
                  <p className="flex flex-col gap-0 md:gap-4 text-xl md:text-2xl xl:text-3xl font-black text-center text-black min-w-fit whitespace-nowrap ">
                    <span>The Elite Budget Web App</span>
                    <span>A NEW WAY TO BUDGET!</span>
                  </p>

                  <img src={Logo} alt="Logo" className="mb-4 sm:mb-0 h-32 w-auto hidden xl:block" />
                </div>
                <div className="w-full xl:w-1/2 flex flex-col justify-center items-center shadow-md py-5 px-5 border rounded-lg">
                  <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full">
                    <div className="mt-2 flex flex-col gap-6 overflow-y-auto">
                      <div className="flex flex-col gap-6 w-full">
                        <div className="w-full">
                          <Textbox
                            placeholder="Full name"
                            type="text"
                            name="FullName"
                            label="Full Name"
                            className="w-full rounded"
                            register={register('FullName', {
                              required: 'Full name is required!',
                            })}
                            error={errors.FullName ? errors.FullName.message : ''}
                          />
                        </div>
                        {/* <p className="text-[11px] text-gray-500">
                          Option: To adjust the Expected Net Worth Calculation; If you didn't start working until you
                          completed an advanced degree, served in the military or were disabled, you can deduct the
                          years spent on those things from your age.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                          <div className="w-full">
                            <Textbox
                              placeholder="Enter Amount"
                              type="number"
                              name="SelfAge"
                              label="Self Age"
                              className="w-full rounded"
                              register={register('SelfAge', {
                                valueAsNumber: true,
                                validate: (value) => value >= 0 || 'Age must be zero or positive',
                              })}
                              error={errors.SelfAge ? errors.SelfAge.message : ''}
                            />
                          </div>
                          <div className="w-full">
                            <Textbox
                              placeholder="Enter Amount"
                              type="number"
                              name="PartnerAge"
                              label="Partner's Age"
                              className="w-full rounded"
                              register={register('PartnerAge', {
                                valueAsNumber: true,
                                validate: (value) => value >= 0 || 'Age must be zero or positive',
                              })}
                              error={errors.PartnerAge ? errors.PartnerAge.message : ''}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 w-full"> */}
                        <div className="w-full">
                          <Select
                            placeholder="Select Country"
                            name="Country"
                            label="Country"
                            options={CountryData?.map((country) => ({
                              value: country.isoCode,
                              label: country.name,
                            }))} // Map country array to options
                            className="w-full rounded"
                            register={register('Country', {
                              required: 'User Country is required!',
                            })}
                            error={errors.Country ? errors.Country.message : ''}
                          />
                        </div>
                        <div className="w-full">
                          <Textbox
                            placeholder="Email Address"
                            type="email"
                            name="Email"
                            label="Email Address"
                            className="w-full rounded"
                            register={register('Email', {
                              required: 'Email Address is required!',
                            })}
                            error={errors.Email ? errors.Email.message : ''}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 w-full">
                        <div className="flex items-center justify-center relative w-full">
                          <div className="w-full">
                            <Textbox
                              placeholder="Enter Password"
                              type={showPassword1 ? 'text' : 'password'}
                              name="Password"
                              label="Password"
                              className="w-full rounded"
                              register={register('Password', {
                                required: 'Password is required!',
                              })}
                              error={errors.Password ? errors.Password.message : ''}
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
                              placeholder="Confirm Password"
                              type={showPassword2 ? 'text' : 'password'}
                              name="ConfirmPassword"
                              label="Confirm Password"
                              className="w-full rounded"
                              register={register('ConfirmPassword', {
                                required: 'Confirm Password is required!',
                                validate: (value) => value === Password || 'Passwords do not match',
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

                      {/* <div className="flex flex-col md:flex-row gap-6 w-full">
                        <div className="w-full">
                          <Textbox
                            placeholder="enter currency"
                            type="text"
                            name="Currency"
                            label="Currency Symbol (e.g. $ or USD)"
                            className="w-full rounded"
                            register={register('Currency', {
                              required: 'Currency is required!',
                            })}
                            error={errors.Currency ? errors.Currency.message : ''}
                          />
                        </div>

                        <div className="w-full">
                          <Select
                            name="DateFormat"
                            label="Date Format"
                            defaultValue="yyyy-MM-dd"
                            options={dateFormats}
                            className="w-full rounded"
                            register={register('DateFormat')}
                            error={errors.DateFormat ? errors.DateFormat.message : ''}
                          />
                        </div>
                      </div> */}
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col md:flex-row gap-0 md:gap-2 items-start">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {acceptPrivacy ? (
                                <MdOutlineRadioButtonChecked className="text-green-500" />
                              ) : (
                                <MdOutlineRadioButtonUnchecked />
                              )}
                            </div>
                            <p className={acceptPrivacy ? 'text-green-500' : 'text-red-500'}>
                              {acceptPrivacy ? 'You have read and accepted' : "You haven't read and accepted"}
                            </p>
                          </div>
                          <a
                            onClick={() => handleOpenPrivacy()}
                            className="flex items-center justify-center text-blue-500 cursor-pointer hover:underline ml-1"
                          >
                            Privacy Policy <LuMousePointer />
                          </a>
                        </div>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-2 items-start">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {acceptTerms ? (
                                <MdOutlineRadioButtonChecked className="text-green-500" />
                              ) : (
                                <MdOutlineRadioButtonUnchecked />
                              )}
                            </div>
                            <p className={acceptTerms ? 'text-green-500' : 'text-red-500'}>
                              {acceptTerms ? 'You have read and accepted' : "You haven't read and accepted"}
                            </p>
                          </div>

                          <a
                            onClick={() => handleOpenTerms()}
                            className="flex items-center justify-center text-blue-500 cursor-pointer hover:underline ml-1"
                          >
                            Terms and Condition <LuMousePointer />
                          </a>
                        </div>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="py-5">
                        <Loading />
                      </div>
                    ) : (
                      <div className="p-3 mt-4 flex flex-row-reverse justify-center items-center gap-5">
                        <a
                          href="/login"
                          className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-500 underline cursor-pointer"
                        >
                          Already Have an Account?
                        </a>
                        <Button
                          type="submit"
                          className="w-fit flex flex-row-reverse items-center gap-1 text-white bg-black"
                          label="Sign Up"
                          // disabled={true}
                          disabled={!acceptPrivacy || !acceptTerms}
                          icon={<IoMdSend />}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AddRootUser setUser={setUser} open={open} setOpen={setOpen} key={`UP${new Date().getTime().toString()}`} />
        <PrivacyDialog open={openPrivacy} setOpen={setOpenPrivacy} />
        <TermsDialog open={openTerms} setOpen={setOpenTerms} />
      </div>
    </>
  );
};
