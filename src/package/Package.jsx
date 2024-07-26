import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";

export const Package = () => {
  const navigate = useNavigate();
  const viewSubscription = () => {
    navigate("/subscription");
  };
  return (
    <div className="text-xl flex flex-col items-center justify-center p-5 bg-white">
      <p className="flex flex-col items-center justify-center font-bold text-red-500">
        You do not have an Active Account.
      </p>

      <div className="flex flex-col items-center gap-1 pt-3">
        <Button
          label="Subscribe"
          icon={<BsFillBagCheckFill className="text-sm md:text-lg" />}
          className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
          onClick={() => viewSubscription()}
        />
      </div>
    </div>
  );
};

export default Package;
