import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useForm, useWatch } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import axios from "../../config/axios";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { dateFormatter, getInitials } from "../../utils";
import { toast } from "react-toastify";
import useUserStore from "../../app/user";
import { DateFormats } from "../../utils/budget.filter";
import Textbox from "../../components/Textbox";
import Select from "../../components/Select";
import Loading from "../../components/Loader";
import Button from "../../components/Button";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const Profile = () => {
  const CountryData = Country.getAllCountries();
  const { setUser, user } = useUserStore();

  const dateFormats = DateFormats.map((format) => ({
    value: format.value,
    label: format.label,
  }));

  const [countryCode, setCountryCode] = useState(user ? CountryData.find((country) => country.name === user.Country)?.isoCode : "");
  const [states, setStates] = useState(countryCode ? State.getStatesOfCountry(countryCode) : []);

  const stateCode = useState(states.find((state) => state.name === user.Province)?.isoCode);
  const [cities, setCities] = useState(countryCode && stateCode ? City.getCitiesOfState(countryCode, stateCode) : []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.id) {
      setValue("FullName", user.FullName);
      setValue("Email", user.Email);
      setValue("Contact", user.Contact);
      setValue("City", user.City);
      setValue("Address", user.Address);
      setValue("Currency", user.Currency);
      setValue("PartnerAge", user.PartnerAge);
      setValue("SelfAge", user.SelfAge);
    }

    return () => reset();
  }, [user?.id, countryCode]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    // setIsLoading(() => true);
    const id = toast.loading("Loading....");

    axios
      .patch("/api/rootusers/" + user.id, data)
      .then(({ data }) => {
        setUser(data);
        toast.update(id, {
          render: "Profile Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log("Error : ", err);
        toast.update(id, {
          render: handleAxiosResponseError(err),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    const country = Country.getCountryByCode(isoCode);
    setCountryCode(() => isoCode);
    setValue("Country", country.name);
    setValue("Separator", "en-" + isoCode);
    const states = State.getStatesOfCountry(isoCode);
    setStates(() => states);
  };

  const handleStateChange = (e) => {
    const isoCode = e.target.value;
    const state = State.getStateByCodeAndCountry(isoCode, countryCode);
    setValue("Province", state.name);
    const cities = City.getCitiesOfState(countryCode, state.isoCode);
    setCities(() => cities);
  };

  return (
    <main className="w-full min-h-screen py-1">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8  sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl"> Profile</h2>

          <div className="grid mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div className="w-40 h-40 items-center justify-center rounded-full bg-black">
                <span className="text-white text-6xl font-semibold flex items-center justify-center h-full">
                  {getInitials(user?.FullName)}
                </span>
              </div>

              {/* <div className="flex flex-col space-y-5 sm:ml-8">
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  Change picture
                </button>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  Delete picture
                </button>
              </div> */}
            </div>

            <form className="items-center mt-8 sm:mt-14 text-[#202142]" onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
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

              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <Textbox
                    type="text"
                    name="Contact"
                    label="Contact"
                    className="w-full rounded"
                    register={register("Contact")}
                    disabled={true}
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
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <Select
                  placeholder="Country"
                  name="Country"
                  label="Country"
                  defaultValue={countryCode}
                  options={CountryData.map((country) => ({
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  className="w-full rounded"
                  onChange={handleCountryChange}
                />
                <Select
                  placeholder="Province"
                  name="Province"
                  label="Province"
                  defaultValue={stateCode}
                  options={states.map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                  }))}
                  className="w-full rounded"
                  onChange={handleStateChange}
                />
                <Select
                  placeholder="City"
                  name="City"
                  label="City"
                  options={cities.map((city) => ({
                    value: city.isoCode,
                    label: city.name,
                  }))}
                  className="w-full rounded"
                  register={register("City", {
                    required: "City is required!",
                  })}
                  error={errors.City ? errors.City.message : ""}
                />
              </div>

              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <Textbox
                    placeholder="Enter Currency"
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

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-fit flex flex-row-reverse items-center gap-1 text-white bg-black"
                  label="Update"
                  icon={<IoMdSend />}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
