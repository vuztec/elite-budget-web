import React, { useEffect, useState } from 'react';
import { Country } from 'country-state-city';
import { useForm, useWatch } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Select from '../Select';
import Loading from '../Loader';
import Button from '../Button';
import axios from '../../config/axios';
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../app/user';
import { DateFormats } from '../../utils/budget.filter';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import Logo from '../../assets/logo.png';

export const CreateNewAccount = ({}) => {
  const CountryData = Country.getAllCountries();
  const { setUser, user } = useUserStore();

  const dateFormats = DateFormats.map((format) => ({
    value: format.value,
    label: format.label,
  }));

  const [countryCode, setCountryCode] = useState(
    user ? CountryData.find((country) => country.name === user.Country)?.isoCode : '',
  );

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const Password = useWatch({ control, name: 'Password' });

  useEffect(() => {
    if (user?.id) {
      setValue('FullName', user.FullName);
      setValue('Email', user.Email);
      setValue('Currency', user.Currency);
      setValue('PartnerAge', user.PartnerAge);
      setValue('SelfAge', user.SelfAge);
      setValue('Country', user.Country);

      const country = CountryData.find((country) => country.name === user?.Country)?.isoCode;
      setCountryCode(country);
    }

    return () => reset();
  }, [user?.id]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);

    const id = toast.loading('Updating User Profile....');
    delete data.ConfirmPassword;

    if (user?.id) {
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
          navigate('/login');
        })
        .catch((err) => {
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

  const handleCountryChange = (e) => {
    if (e && e.target?.value) {
      const selCountry = e.target?.value;
      const targetCountry = CountryData.find((item) => item?.isoCode === selCountry);
      setValue('Country', targetCountry.name);
      setValue('Currency', targetCountry.currency);
      const selCountryCode = targetCountry ? targetCountry.isoCode : '';
      setCountryCode(selCountryCode);

      setValue('Separator', 'en-' + selCountryCode);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full flex gap-16 flex-col items-center justify-center">
          <div className="h-full w-full lg:w-2/3 flex flex-col lg:flex-row items-center justify-center gap-24">
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
              <h1 className="text-3xl font-bold text-gray-900">{'CREATE NEW ACCOUNT'}</h1>
              <span className="flex text-center py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-tryText bg-tryBg">
                Enjoy a 14-day free trial followed by an annual billing at just $7.99 per month
              </span>
              <p className="flex flex-col gap-0 md:gap-4 text-xl md:text-2xl xl:text-3xl font-black text-center text-black min-w-fit whitespace-nowrap ">
                <span>The Elite Budget Web App</span>
                <span>A NEW WAY TO BUDGET!</span>
              </p>

              <img src={Logo} alt="Logo" className="mb-4 sm:mb-0 h-52 w-auto" />
            </div>
            <div className="w-ful lg:w-2/3 flex flex-col justify-center items-center shadow-md py-8 px-10 border rounded-lg">
              <form onSubmit={handleSubmit(handleOnSubmit)} className="">
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
                    <p className="text-[11px] text-gray-500">
                      Option: To adjust the Expected Net Worth Calculation; If you didn't start working until you
                      completed an advanced degree, served in the military or were disabled, you can deduct the years
                      spent on those things from your age.
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
                  <div className="flex flex-col gap-6 w-full">
                    <div className="w-full">
                      <Select
                        placeholder="Select Country"
                        name="Country"
                        label="Country"
                        onChange={handleCountryChange}
                        options={CountryData?.map((country) => ({
                          value: country.isoCode,
                          label: country.name,
                        }))} // Map country array to options
                        className="w-full rounded"
                        defaultValue={countryCode}
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
                  {!user && (
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                      <Textbox
                        placeholder="Enter Password"
                        type="password"
                        name="Password"
                        label="Password"
                        className="w-full rounded"
                        register={register('Password', {
                          required: 'Password is required!',
                        })}
                        error={errors.Password ? errors.Password.message : ''}
                      />

                      <Textbox
                        placeholder="Confirm Password"
                        type="password"
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
                  )}

                  <div className="flex flex-col md:flex-row gap-6 w-full">
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
                  </div>
                </div>

                {isLoading ? (
                  <div className="py-5">
                    <Loading />
                  </div>
                ) : (
                  <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
                    <Button
                      type="submit"
                      className="w-fit flex flex-row-reverse items-center gap-1 text-white bg-black"
                      label="Enter"
                      icon={<IoMdSend />}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
