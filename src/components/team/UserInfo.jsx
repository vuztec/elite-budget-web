import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials, themeColors } from "../../utils";
import { FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const UserInfo = ({ user }) => {
  return (
    <div className="px-4">
      <Popover className="relative">
        {/* {({ open }) => ( */}
        <>
          <Popover.Button className="group inline-flex items-center outline-none">
            <span>{getInitials(user?.resourcesdb?.FullName)}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
              <div className="flex items-center gap-4 rounded-lg shadow-lg bg-white p-8">
                <div className="w-16 h-16 bg-[#20409A] rounded-full text-white flex items-center justify-center text-2xl ">
                  <span className="text-center font-bold">
                    {getInitials(user?.resourcesdb?.FullName)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-black text-xl font-bold">
                    {user?.resourcesdb?.FullName}
                  </p>
                  <span className="text-base text-gray-500 italic">
                    {user?.resourcesdb?.Designation}
                  </span>
                  <div className="flex gap-3 items-center text-left">
                    <MdEmail className={"text-sm text-primary"} />
                    <span className="text-blue-500">
                      {user?.resourcesdb?.Email}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center text-left">
                    <FaPhoneSquare className="text-sm text-primary" />
                    <span className="text-gray-500">
                      {user?.resourcesdb?.Telephone}
                    </span>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
        {/* )} */}
      </Popover>
    </div>
  );
};

export default UserInfo;
