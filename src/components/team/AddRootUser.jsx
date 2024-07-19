import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useForm, useWatch } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import axios from "../../config/axios";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { dateFormatter } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../app/user";
import { DateFormats } from "../../utils/budget.filter";

export const AddRootUser = ({ open, setOpen, recordData, serverUrl }) => {
  const CountryData = Country.getAllCountries();
  const { setUser, user } = useUserStore();

  const dateFormats = DateFormats.map((format) => ({
    value: format.value,
    label: format.label,
  }));

  const [countryCode, setCountryCode] = useState(
    recordData ? CountryData.find((country) => country.name === recordData.Country)?.isoCode : ""
  );
  const [states, setStates] = useState(recordData && countryCode ? State.getStatesOfCountry(countryCode) : []);

  const [stateCode, setStateCode] = useState(recordData ? states.find((state) => state.name === recordData.State)?.isoCode : "");
  const [cities, setCities] = useState(recordData && countryCode && stateCode ? City.getCitiesOfState(countryCode, stateCode) : []);

  const navigate = useNavigate();

  const defaultValues = recordData
    ? {
        ...recordData,
        DateOfBirth: recordData?.DateOfBirth ? dateFormatter(recordData?.DateOfBirth) : "",
      }
    : {};

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const Password = useWatch({ control, name: "Password" });

  useEffect(() => {
    if (recordData?.id) {
      setValue("Country", recordData.Country);
      setValue("State", recordData.State);
      setValue("City", recordData.City);

      const country = CountryData.find((country) => country.name === recordData?.Country)?.isoCode;
      setCountryCode(country);

      setStates(() => State.getStatesOfCountry(country));

      setStateCode(() => states.find((state) => state.name === recordData.State)?.isoCode);
    }
    return () => reset();
  }, [recordData?.id]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);
    delete data.ConfirmPassword;
    try {
      if (recordData?.id) {
        delete data.id;
        const response = await axios.put(`${serverUrl}/api/rootuser/${recordData?.id}`, data);
        if (response.status === 201 || response.status === 203) {
          // Adjusted status code check
          // Handle success
          setIsLoading(() => false);

          toast.success("Profile Updated Successfully");
          // data.id = recordData.id;
          if (user?.id === recordData?.id) {
            setUser(response.data.items, response.data.items);
          }
          setOpen(false);
        } else {
          // Handle error
          setIsLoading(() => false);

          console.error("Failed to update profile");
        }
      } else {
        const response = await axios.post(`${serverUrl}/api/rootuser`, data);
        if (response.status === 201 || response.status === 203) {
          // Adjusted status code check
          // Handle success
          setIsLoading(() => false);

          toast.success("Please login to continue");
          navigate("/login/admin");
          // data.id = recordData.id;
          if (user?.id === recordData?.id) {
            setUser(response.data.items, response.data.items);
          }
          setOpen(false);
        } else {
          // Handle error
          setIsLoading(() => false);

          console.error("Failed to update profile");
        }
      }
    } catch (error) {
      setIsLoading(() => false);

      console.error("Error:", error);
    }
  };

  const handleCountryChange = (e) => {
    if (e && e.target?.value) {
      const selCountry = e.target?.value;
      const targetCountry = CountryData.find((item) => item?.isoCode === selCountry);
      setValue("Country", targetCountry.name);
      setValue("CountryCurrency", targetCountry.currency);
      const selCountryCode = targetCountry ? targetCountry.isoCode : "";
      setCountryCode(selCountryCode);

      setValue("Separator", "en-" + selCountryCode);
      const states = State.getStatesOfCountry(selCountryCode);
      setStates(() => states);
    }
  };

  const handleStateChange = (e) => {
    const isoCode = e.target.value;
    const state = State.getStateByCodeAndCountry(isoCode, countryCode);
    setValue("State", state.name);
    const cities = City.getCitiesOfState(countryCode, state.isoCode);
    setCities(() => cities);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE USER PROFILE" : "CREATE NEW ACCOUNT"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <div className="w-full">
                <Textbox
                  placeholder="Full name"
                  type="text"
                  name="FullName"
                  label="Full Name"
                  className="w-full rounded"
                  register={register("FullName", {
                    required: "Full name is required!",
                  })}
                  error={errors.FullName ? errors.FullName.message : ""}
                />
              </div>
              <div className="w-full">
                <Textbox
                  placeholder="Enter Amount"
                  type="number"
                  name="SelfAge"
                  label="Self Age"
                  className="w-full rounded"
                  register={register("SelfAge", {
                    valueAsNumber: true,
                    validate: (value) => value >= 0 || "Age must be zero or positive",
                  })}
                  error={errors.SelfAge ? errors.SelfAge.message : ""}
                />
              </div>
              <div className="w-full">
                <Textbox
                  placeholder="Enter Amount"
                  type="number"
                  name="PartnerAge"
                  label="Partner's Age"
                  className="w-full rounded"
                  register={register("PartnerAge", {
                    valueAsNumber: true,
                    validate: (value) => value >= 0 || "Age must be zero or positive",
                  })}
                  error={errors.PartnerAge ? errors.PartnerAge.message : ""}
                />
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
                  register={register("Country", {
                    required: "User Country is required!",
                  })}
                  error={errors.Country ? errors.Country.message : ""}
                />
              </div>
              <div className="w-full">
                <Textbox
                  placeholder="Email Address"
                  type="email"
                  name="Email"
                  label="Email Address"
                  className="w-full rounded"
                  register={register("Email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.Email ? errors.Email.message : ""}
                />
              </div>
            </div>
            {recordData?.length < 1 && (
              <div className="flex flex-col gap-6 w-full">
                <Textbox
                  placeholder="Enter Password"
                  type="password"
                  name="Password"
                  label="Password"
                  className="w-full rounded"
                  register={register("Password", {
                    required: "Password is required!",
                  })}
                  error={errors.Password ? errors.Password.message : ""}
                />

                <Textbox
                  placeholder="Confirm Password"
                  type="password"
                  name="ConfirmPassword"
                  label="Confirm Password"
                  className="w-full rounded"
                  register={register("ConfirmPassword", {
                    required: "Confirm Password is required!",
                    validate: (value) => value === Password || "Passwords do not match",
                  })}
                  error={errors.ConfirmPassword ? errors.ConfirmPassword.message : ""}
                />
              </div>
            )}

            <div className="flex flex-col gap-6 w-full">
              <div className="w-full">
                <Textbox
                  placeholder="enter currency"
                  type="text"
                  name="Currency"
                  label="Currency Symbol (e.g. $)"
                  className="w-full rounded"
                  register={register("Currency", {
                    required: "Currency is required!",
                  })}
                  error={errors.Currency ? errors.Currency.message : ""}
                />
              </div>

              <div className="w-full">
                <Select
                  name="DateFormat"
                  label="Date Format"
                  defaultValue="yyyy-MM-dd"
                  options={dateFormats}
                  className="w-full rounded"
                  register={register("DateFormat")}
                  error={errors.DateFormat ? errors.DateFormat.message : ""}
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
                label="Submit"
                icon={<IoMdSend />}
              />

              <Button
                type="button"
                className="bg-pink-200 flex flex-row-reverse items-center gap-1 text-gray-900"
                onClick={() => setOpen(false)}
                label="Cancel"
                icon={<TiCancel />}
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddRootUser;
