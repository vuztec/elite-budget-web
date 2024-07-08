import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { IoMdArrowDropright } from "react-icons/io";
import { SidebarLinks } from "../utils/sidebar.data";
import Logo from "../assets/logo.png";
import useUserStore from "../app/user";
import { GrClose } from "react-icons/gr";
import { getFinancialPermission } from "../utils/permissions";

const Sidebar = () => {
  const { user, root } = useUserStore();
  const hasFin = getFinancialPermission(user); // only show Cost if hasFin is true
  const current_subcription = root?.subscriptions?.[0];
  const Package = current_subcription?.Package; //ONLY show (Acsentee, Allocation, Timesheet) if Package === "Premium"
  const isAdmin = true;
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSideBarData] = useState(isAdmin ? SidebarLinks : SidebarLinks.slice(0, 1));
  const { setSidebar } = useUserStore();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

  const path = location.pathname?.split("/")[1];

  useEffect(() => {
    if (sidebarData?.length && !hasFin) setSideBarData((old) => old.filter((item) => item.label !== "Costs"));

    if (sidebarData?.length && Package !== "Premium") {
      const tabs = ["Allocation", "Absentees", "Timesheets"];
      setSideBarData((old) =>
        old.map((sidebar) =>
          sidebar.label === "Team"
            ? {
                ...sidebar,
                sub: sidebar.sub.filter((item) => !tabs.includes(item.label)),
              }
            : sidebar
        )
      );
    }

    if (sidebarData?.length && user.Type !== "Root") {
      setSideBarData((old) =>
        old.map((sidebar) =>
          sidebar.label === "Settings"
            ? {
                ...sidebar,
                sub: sidebar.sub.filter((item) => item.label !== "Membership"),
              }
            : sidebar
        )
      );
    }
  }, [hasFin, user]);

  const NavLinks = ({ el }) => {
    const title = el.label.split(" ")[0].toLocaleLowerCase();
    const handleLink = () => {
      if (el.link) {
        navigate(el.link);
        setSideBarData((prev) => prev.map((item) => ({ ...item, dropdown: false })));
        setSidebar();
      } else {
        setSideBarData((prev) =>
          prev.map((item) => (item.label === el.label ? { ...item, dropdown: !item.dropdown } : { ...item, dropdown: false }))
        );
      }
    };

    const handleSubMenu = () => {
      setSidebar();

      if (window.innerWidth >= 768 && window.innerWidth <= 1024)
        setSideBarData((prev) =>
          prev.map((item) => (item.label === el.label ? { ...item, dropdown: !item.dropdown } : { ...item, dropdown: false }))
        );
    };
    return (
      <div onClick={handleLink} className={clsx("w-full flex flex-col cursor-pointer ")}>
        <div
          className={clsx(
            "w-full flex justify-between gap-2 px-3 py-2 items-center rounded-full text-gray-800 text-base hover:bg-[#2564ed2d]",
            path === el?.link?.split("/")[0] || location.pathname.includes(title) ? "bg-[#00ABBD] " : ""
          )}
        >
          <div
            className={`flex items-center gap-4 ${
              path === el?.link?.split("/")[0] || location.pathname.includes(title) ? "text-white" : "text-[#27708A] hover:text-[#00ABBD]"
            } `}
          >
            <div className="text-lg">{el.icon}</div>
            <span className="md:hidden lg:block">{el.label}</span>
          </div>
          <div className={el.sub?.length ? "text-[#27708A] hover:text-[#00ABBD]" : "hidden"}>
            <IoMdArrowDropright />
          </div>
        </div>
        <div
          className={` md:absolute md:bg-primary md:rounded md:ml-16 lg:static lg:bg-white lg:rounded-none lg:ml-12 ${
            el.dropdown && el.sub?.length ? "ml-12 transition-all" : "hidden transition-all"
          }`}
        >
          {el.sub?.map((item, index) => (
            <div
              className={`w-full text-md leading-6 px-3 py-1 rounded-full hover:bg-[#2564ed15]  ${
                parseInt(tab) === index && title === name ? "md:text-white lg:text-[#27708A] bg-[#2564ed2d] " : "text-[#A7A7A7]"
              }`}
              key={index}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={item.link + `?name=${title}&tab=${index}`} className="w-full flex" onClick={() => handleSubMenu(index)}>
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-72 bg-white h-screen md:h-auto overflow-y-auto md:w-full flex flex-col py-5 md:px-3 lg:px-5 overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between">
        <h1 className="flex gap-1 items-center mb-3">
          <img src={Logo} alt="logo" className="h-8 md:h-5 lg:h-8 px-3 md-px-0 lg:px-3" />
        </h1>
        <button className="md:hidden mr-4 p-2 h-min rounded-full hover:bg-[#2564ed15]" onClick={setSidebar}>
          <GrClose />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-y-3 py-2">
        {sidebarData.map((item, index) => (
          <NavLinks el={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
