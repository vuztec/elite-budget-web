import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import { themeColors } from "../../utils";
import clsx from "clsx";
import {
  InternationalPrices,
  NumberOfProject,
  NumberOfTeam,
  Packages,
  getPackagePrice,
  getProjectItems,
} from "../../utils/PackageData";
import { MdPeople } from "react-icons/md";
import { BsFillBagCheckFill, BsFillBagXFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Quote from "../../components/setting/Quote";
import { getExchangeRate, getProjects, getResources } from "../../config/api";
import { useQuery } from "react-query";
import Loading from "../../components/Loader";

export const Membership = () => {
  const { root } = useUserStore();
  const gridData = Packages;
  const current_subcription = root.subscriptions?.[0];
  const currentPackage = current_subcription?.Package;

  const [creditAmount, setCreditedAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [subscription, setSubcription] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [teamSize, setTeamSize] = useState([]);
  const [projectSize, setProjectSize] = useState([]);
  const [rate, setRate] = useState(0);

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: exchangeRate, status: isExchangeRateLoaded } = useQuery({
    queryKey: ["exchangerate", root?.CountryCurrency],
    queryFn: () => getExchangeRate(root?.CountryCurrency),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (isExchangeRateLoaded === "success") setRate(Number(exchangeRate.Rate));
  }, [isExchangeRateLoaded, exchangeRate]);

  useEffect(() => {
    if (
      currentPackage !== "Basic" &&
      currentPackage !== "Standard" &&
      currentPackage !== "Premium" &&
      isExchangeRateLoaded === "success"
    ) {
      setCreditedAmount(0);
      const numberOfProject = NumberOfProject?.map((project) => ({
        value: project,
        label: project,
      }));
      setProjectSize(numberOfProject);

      const numberOfTeam = NumberOfTeam?.map((team) => ({
        value: team,
        label: team,
      }));
      setTeamSize(numberOfTeam);
    } else {
      const teamSize = current_subcription?.TeamSize;
      const projectSize = current_subcription?.Projects;
      const today = new Date();
      const subscription = new Date(current_subcription?.SubscribeDate);
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const daysElapsed = (today - subscription) / millisecondsPerDay;
      const subscriptionYear = subscription.getFullYear();
      const todayYear = today.getFullYear();
      let totalDaysInYears = 0;
      // Calculate total days in subscription years
      for (let year = subscriptionYear; year <= todayYear; year++) {
        totalDaysInYears += isLeapYear(year) ? 366 : 365;
      }
      const credit = (totalDaysInYears - daysElapsed) / totalDaysInYears;
      const price = getPackagePrice(projectSize, teamSize, currentPackage);

      const creditedAmount = (credit * price).toFixed(2);
      setCurrentPrice(price);
      setCreditedAmount(creditedAmount);
      setSubcription(totalDaysInYears);
      setRatio(credit);
      // remove team sizes that are not greater than teamSize
      const filteredNumberOfProject = NumberOfProject?.filter(
        (project) => project >= projectData?.length
      )?.map((project) => ({
        value: project,
        label: project,
      }));
      setProjectSize(filteredNumberOfProject);

      // remove projects sizes that are not greater than projectSize
      const filteredNumberOfTeam = NumberOfTeam?.filter(
        (team) => team >= resourceData?.length
      )?.map((team) => ({
        value: team,
        label: team,
      }));
      setTeamSize(filteredNumberOfTeam);
    }
  }, [
    root,
    NumberOfProject,
    NumberOfTeam,
    projectData,
    resourceData,
    isExchangeRateLoaded,
  ]);

  // Function to check if a year is a leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Features</th>
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
            <span
              className={clsx(
                "font-semibold w-fit px-2 py-1 rounded-md text-white whitespace-nowrap",
                currentPackage === "Basic" ? `bg-viewcolor` : `bg-gray-600`
              )}
            >
              From {root.CountryCurrency}{" "}
              {Math.round(InternationalPrices.Basic * rate)?.toFixed(2)} /month
            </span>
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
            <span
              className={clsx(
                "font-semibold w-fit px-2 py-1 rounded-md text-white whitespace-nowrap",
                currentPackage === "Standard" ? `bg-viewcolor` : `bg-gray-600`
              )}
            >
              From {root.CountryCurrency}{" "}
              {Math.round(InternationalPrices.Standard * rate)?.toFixed(2)}{" "}
              /month
            </span>
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
            <span
              className={clsx(
                "font-semibold w-fit px-2 py-1 rounded-md text-white whitespace-nowrap",
                currentPackage === "Premium" ? `bg-viewcolor` : `bg-gray-600`
              )}
            >
              From {root.CountryCurrency}{" "}
              {Math.round(InternationalPrices.Premium * rate)?.toFixed(2)}{" "}
              /month
            </span>
          </div>
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 text-sm">
        <span className="text-slate-500">{item.Feature}</span>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 text-sm">
        {item.Basic === 1 && (
          <span className="text-green-500 text-xl">
            <BsFillBagCheckFill />
          </span>
        )}
        {item.Basic === 0 && (
          <span className="text-red-500 text-xl">
            <BsFillBagXFill />
          </span>
        )}
        {item.Basic !== 1 && item.Basic !== 0 && (
          <span className="text-slate-500">
            {item.Basic}
            {getProjectItems(item.Feature, item.Basic)}{" "}
          </span>
        )}
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 text-sm">
        {item.Standard === 1 && (
          <span className="text-green-500 text-xl">
            <BsFillBagCheckFill />
          </span>
        )}
        {item.Standard === 0 && (
          <span className="text-red-500 text-xl">
            <BsFillBagXFill />
          </span>
        )}
        {item.Standard !== 1 && item.Standard !== 0 && (
          <span className="text-slate-500">
            {item.Standard}
            {getProjectItems(item.Feature, item.Standard)}{" "}
          </span>
        )}
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 text-sm">
        {item.Premium === 1 && (
          <span className="text-green-500 text-xl">
            <BsFillBagCheckFill />
          </span>
        )}
        {item.Premium === 0 && (
          <span className="text-red-500 text-xl">
            <BsFillBagXFill />
          </span>
        )}
        {item.Premium !== 1 && item.Premium !== 0 && (
          <span className="text-slate-500">
            {item.Premium}
            {getProjectItems(item.Feature, item.Premium)}{" "}
          </span>
        )}
      </td>
    </tr>
  );

  return isExchangeRateLoaded !== "success" ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full mt-5 mb-5 shadow-md rounded bg-white">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <MdPeople className={`text-2xl text-[${themeColors[1]}]`} />
          <Title title="Packages" />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-3/5 h-fit bg-white py-2 rounded">
          <div className="overflow-x-auto">
            <table className="w-[97%] m-5">
              <TableHeader />
              <tbody>
                {gridData.map((item, index) => (
                  <TableRow key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Quote
          creditAmount={creditAmount}
          projectSize={projectSize}
          teamSize={teamSize}
          currentPackage={currentPackage}
          currentPrice={currentPrice}
          subscription={subscription}
          ratio={ratio}
          rate={rate}
        />
      </div>
    </div>
  );
};
