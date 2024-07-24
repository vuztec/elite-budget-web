import React from "react";
import Assets from "../../components/networth/Assets";
import Liabilities from "../../components/networth/Liabilities";
import CurrentNetworth from "../../components/networth/CurrentNetworth";
import ExpectedNetworth from "../../components/networth/ExpectedNetworth";

export const Networth = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5 xl:gap-10 bg-white p-5">
      <div className="w-full 2xl:w-[80%] flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col w-full">
          <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
            ASSETS (Market Value of What You Own)
          </h1>
          <div>
            <Assets />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
            LIABILITIES (How Much You Owe)
          </h1>
          <div>
            <Liabilities />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
            NET WORTH (Assets - Liabilities)
          </h1>
          <div>
            <CurrentNetworth />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
            EXPECTED NET WORTH
          </h1>
          <div>
            <ExpectedNetworth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networth;
