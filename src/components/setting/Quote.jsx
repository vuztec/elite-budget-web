import React, { useState } from "react";
import { getPackagePrice, getTotalPrice, getUnitPrice } from "../../utils/PackageData";
import clsx from "clsx";
import Select from "../Select";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { getTaskEndDate, themeColors } from "../../utils";
import { MdOutlinePayment } from "react-icons/md";
import useUserStore from "../../app/user";
import { format } from "date-fns";
import axios from "axios";
import Loading from "../Loader";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Quote = ({ creditAmount, projectSize, teamSize, currentPackage, currentPrice, subscription, ratio, rate }) => {
  const { user, root } = useUserStore();
  const current_subcription = root?.subscriptions?.[0];

  const hasAccount =
    current_subcription?.Projects > 0 &&
    current_subcription?.TeamSize > 0 &&
    (currentPackage === "Basic" || currentPackage === "Standard" || currentPackage === "Premium");
  const customDateFormat = root?.DateFormat ? root?.DateFormat : "MMM dd, yyyy";
  const [projectFilter, setProjectFilter] = useState(current_subcription?.Projects ? current_subcription?.Projects : 1);
  const [teamFilter, setTeamFilter] = useState(current_subcription?.TeamSize ? current_subcription?.TeamSize : 1);
  const [selectedPackage, setSelectedPackage] = useState("Premium");
  const [selectedAmount, setSelectedAmount] = useState(
    hasAccount ? getPackagePrice(current_subcription?.Projects, current_subcription?.TeamSize, "Premium") : 12 * 25
  );
  const [isLoading, setIsLoading] = useState(false);
  const remaining = hasAccount ? ratio : 1;

  const handleProjectChange = (e) => {
    if (e && e.target?.value) {
      setProjectFilter(e.target?.value);
      const amount = getPackagePrice(e.target?.value, teamFilter, selectedPackage);
      setSelectedAmount(amount);
    }
  };
  const handleTeamChange = (e) => {
    if (e && e.target?.value) {
      setTeamFilter(e.target?.value);
      const amount = getPackagePrice(projectFilter, e.target?.value, selectedPackage);
      setSelectedAmount(amount);
    }
  };

  const Subscribe = (el) => {
    setSelectedPackage(el);
    const amount = getPackagePrice(projectFilter, teamFilter, el);
    setSelectedAmount(amount);
  };

  const PayNow = () => {
    setIsLoading(() => true);
    axios
      .post(SERVER_URL + "/api/payment/payment-indentifier", {
        amount: remaining * Number(selectedAmount) - Number(creditAmount),
        projects: projectFilter,
        teamsize: teamFilter,
        package: selectedPackage,
      })
      .then(({ data }) => {
        console.log(data);
        window.payfast_do_onsite_payment({
          uuid: data.items,
          return_url: "https://pm.vuzte.com/settings/membership?name=settings&tab=5",
          // cancel_url: "https://pm.vuzte.com/settings/membership?name=settings&tab=5",
        });
        setIsLoading(() => false);
        // window.location.href = data.url;
      })
      .catch((err) => {
        setIsLoading(() => false);
        console.log("Error : ", err);
      });
  };

  return (
    <div className="w-full xl:w-2/5 h-fit p-7 bg-blue-50 rounded overflow-x-auto">
      {(currentPackage === "Basic" || currentPackage === "Standard" || currentPackage === "Premium") && (
        <>
          <div className="flex items-center px-2 xl:px-10 font-bold text-2xl bg-green-50 text-slate-500 pt-5">
            <span>Current Package</span>
          </div>
          <div className="w-full flex flex-col px-2 xl:px-10 gap-1 justify-start bg-green-50 text-slate-500 pb-5">
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Package:</span>
              <span className="font-bold text-lg text-black">{currentPackage}</span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Team Size:</span>
              <span className="font-bold text-lg text-black">{current_subcription?.Projects}</span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Number of Projects:</span>
              <span className="font-bold text-lg text-black">{current_subcription?.TeamSize}</span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Expiration Date:</span>
              <span className="font-bold text-lg text-black">
                {current_subcription?.SubscribeDate
                  ? format(getTaskEndDate(current_subcription?.SubscribeDate, subscription), customDateFormat)
                  : ""}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center xl:px-10 font-bold text-2xl text-slate-500 pt-5">
        <span>Quote</span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex py-5 xl:px-10 gap-5 xl:gap-10">
          <div className="w-full">
            <Select
              onChange={handleProjectChange}
              value={projectFilter}
              options={projectSize}
              placeholder=""
              label="Number of Projects"
              className="bg-white w-full py-1"
            />
          </div>
          <div className="w-full">
            <Select
              onChange={handleTeamChange}
              value={teamFilter}
              options={teamSize}
              placeholder=""
              label="Team Size"
              className="bg-white w-full py-1"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <table className="w-[97%] xl:m-5">
            <thead>
              <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
                <th className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center gap-3">
                      <span className="font-bold ">BASIC</span>
                      {currentPackage === "Basic" && (
                        <span className={`font-bold text-2xl text-green-500`}>
                          <RiVerifiedBadgeFill />
                        </span>
                      )}
                    </div>
                  </div>
                </th>
                <th className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center gap-3">
                      <span className="font-bold ">STANDARD</span>
                      {currentPackage === "Standard" && (
                        <span className={`font-bold text-2xl text-green-500`}>
                          <RiVerifiedBadgeFill />
                        </span>
                      )}
                    </div>
                  </div>
                </th>
                <th className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center gap-3">
                      <span className="font-bold ">PREMIUM</span>
                      {currentPackage === "Premium" && (
                        <span className={`font-bold text-2xl text-green-500`}>
                          <RiVerifiedBadgeFill />
                        </span>
                      )}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-50 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
                <td className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      1 user: {root.CountryCurrency} {Math.round(getUnitPrice(projectFilter, teamFilter, "Basic") * rate)?.toFixed(2)} pm
                    </span>
                  </div>
                </td>
                <td className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      1 user: {root.CountryCurrency} {Math.round(getUnitPrice(projectFilter, teamFilter, "Standard") * rate)?.toFixed(2)} pm
                    </span>
                  </div>
                </td>
                <td className="border-l border-r border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      1 user: {root.CountryCurrency} {Math.round(getUnitPrice(projectFilter, teamFilter, "Premium") * rate)?.toFixed(2)} pm
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border border-gray-50 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
                <td className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      Total: {root.CountryCurrency} {Math.round(getTotalPrice(projectFilter, teamFilter, "Basic") * rate)?.toFixed(2)} pm
                    </span>
                    <span className="text-black text-sm">Billed Annually</span>
                  </div>
                </td>
                <td className="border-l border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      Total: {root.CountryCurrency} {Math.round(getTotalPrice(projectFilter, teamFilter, "Standard") * rate)?.toFixed(2)} pm
                    </span>
                    <span className="text-black text-sm">Billed Annually</span>
                  </div>
                </td>
                <td className="border-l border-r border-gray-300 py-2 px-0">
                  <div className="flex flex-col items-center">
                    <span className={clsx("font-semibold w-fit px-2 py-1 rounded-md text-slate-500 whitespace-nowrap")}>
                      Total: {root.CountryCurrency} {Math.round(getTotalPrice(projectFilter, teamFilter, "Premium") * rate)?.toFixed(2)} pm
                    </span>
                    <span className="text-black text-sm">Billed Annually</span>
                  </div>
                </td>
              </tr>
              <tr className="text-sm xl:text-[16px] hover:bg-gray-400/10 text-center">
                <td className="border-l border-b border-gray-300 p-5">
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={clsx(
                        "w-full flex gap-1 items-center justify-center text-white hover:bg-viewcolor hover:text-white px-2 py-1 rounded-full cursor-pointer",
                        selectedPackage === "Basic" ? "bg-viewcolor" : `font-bold text-lg bg-[${themeColors[1]}]`
                      )}
                      onClick={() => Subscribe("Basic")}
                    >
                      Subscribe
                    </span>
                  </div>
                </td>
                <td className="border-l border-b border-gray-300 py-2 px-5">
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={clsx(
                        "w-full flex gap-1 items-center justify-center text-white hover:bg-viewcolor hover:text-white px-2 py-1 rounded-full cursor-pointer",
                        selectedPackage === "Standard" ? "bg-viewcolor px-2 py-1" : `font-bold text-lg bg-[${themeColors[1]}]`
                      )}
                      onClick={() => Subscribe("Standard")}
                    >
                      Subscribe
                    </span>
                  </div>
                </td>
                <td className="border-l border-r border-b border-gray-300 py-2 px-5">
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={clsx(
                        "w-full flex gap-1 items-center justify-center text-white hover:bg-viewcolor hover:text-white px-2 py-1 rounded-full cursor-pointer",
                        selectedPackage === "Premium" ? "bg-viewcolor" : `font-bold text-lg bg-[${themeColors[1]}]`
                      )}
                      onClick={() => Subscribe("Premium")}
                    >
                      Subscribe
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {Number(currentPrice) < Number(selectedAmount) && (
          <div className="w-full xl:w-2/3 flex flex-col px-5 gap-3 justify-start text-slate-500">
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Selected Package:</span>
              <span className="font-bold text-lg text-black">{selectedPackage}</span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">* Selected Amount:</span>
              <span className="font-bold text-lg text-black">
                {root.CountryCurrency} {Math.round(Number(remaining * Number(selectedAmount)) * rate).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">* Credit:</span>
              <span className="font-bold text-lg text-black">
                {root.CountryCurrency} {Math.round(Number(creditAmount) * rate).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">* Amount Due:</span>
              <span className="font-bold text-lg text-black">
                {root.CountryCurrency} {Math.round(Number(remaining * Number(selectedAmount) - Number(creditAmount)) * rate).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-5 justify-between">
              <span className="font-normal text-lg">Expiration Date:</span>
              <span className="font-bold text-lg text-black">
                {current_subcription?.SubscribeDate
                  ? format(getTaskEndDate(current_subcription?.SubscribeDate, subscription), customDateFormat)
                  : format(getTaskEndDate(new Date(), 365), customDateFormat)}
              </span>
            </div>
            <div className="flex flex-col items-center text-center mb-2">
              {isLoading ? (
                <Loading />
              ) : (
                <button
                  className={clsx(
                    "w-full flex gap-3 items-center justify-center text-white hover:bg-viewcolor hover:text-white px-2 py-1 rounded-full cursor-pointer",
                    `font-bold text-lg bg-[${themeColors[1]}]`
                  )}
                  onClick={() => PayNow()}
                >
                  <MdOutlinePayment className="text-2xl" /> Pay Now
                </button>
              )}
            </div>
            <div className="flex flex-col gap-0 text-xs">
              <p>* Credit = amount not used in the current package</p>
              <p>* Amount Due = Selected Amount - Credit</p>
              <p>
                * Selected Amount = New Amount for remaining period for existing subscription or{" "}
                <b>Annual Amount for the new subscription</b>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quote;
