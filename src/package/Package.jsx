import React from "react";
import useUserStore from "../app/user";
import Button from "../components/Button";
import { themeColors } from "../utils";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { BsFillBagCheckFill } from "react-icons/bs";

export const Package = () => {
  const { user, root } = useUserStore();
  const isRoot = user.Type === "Root";

  const navigate = useNavigate();
  const viewSubscription = () => {
    navigate("/settings/membership?name=settings&tab=5");
  };
  return isRoot ? (
    <div className="text-xl flex flex-col items-center justify-center p-5 bg-white">
      <p className="flex flex-col items-center justify-center font-bold text-red-500">This Package is not Active in this Account.</p>

      <div className="flex flex-col items-center gap-1 pt-3">
        <Button
          label="Subscribe"
          icon={<BsFillBagCheckFill className="text-sm md:text-lg" />}
          className={clsx(
            "flex flex-row-reverse gap-1 items-center justify-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
            `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
          )}
          onClick={() => viewSubscription()}
        />
      </div>
    </div>
  ) : (
    <div className="text-xl flex flex-col items-center justify-center p-5 bg-white">
      <p className="font-bold text-red-500">This Package is not Active in this Account.</p>

      <div className="flex flex-col items-center gap-1 pt-3">
        <p className="font-bold text-red-500">Please contact your account Administrator:</p>
        <span>{root?.FullName}</span>
        <span className="text-lg italic">{root?.Email}</span>
      </div>
    </div>
  );
};

export default Package;
