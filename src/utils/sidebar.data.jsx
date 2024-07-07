import { FiHome } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdOutlineTask, MdPeople } from "react-icons/md";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";

export const SidebarLinks = [
  {
    label: "Home",
    link: "/",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Projects",
    link: null,
    icon: <GrProjects />,
    dropdown: false,
    sub: [
      { label: "Dashboard", link: "/projects" },
      { label: "Grid View", link: "/projects" },
      { label: "List View", link: "/projects" },
      // { label: "Gantt View", link: "/projects" },
    ],
  },
  {
    label: "Tasks",
    link: null,
    icon: <MdOutlineTask />,
    dropdown: false,
    sub: [
      { label: "Dashboard", link: "/tasks" },
      { label: "Grid View", link: "/tasks" },
      { label: "List View", link: "/tasks" },
      // { label: "Gantt View", link: "/tasks" },
    ],
  },
  {
    label: "Costs",
    link: null,
    icon: <LiaMoneyCheckAltSolid />,
    dropdown: false,
    sub: [
      { label: "Dashboard", link: "/costs" },
      { label: "Grid View", link: "/costs" },
      { label: "List View", link: "/costs" },
    ],
  },
  {
    label: "Team",
    link: null,
    icon: <MdPeople />,
    dropdown: false,
    sub: [
      { label: "Members", link: "/team" },
      // {
      //   label: "Allocation",
      //   link: "/team/allocations",
      // },
      {
        label: "Absentees",
        link: "/team/absentee",
      },
      {
        label: "Timesheets",
        link: "/team/timesheet",
      },
    ],
  },
  {
    label: "Settings",
    link: null,
    icon: <IoSettingsOutline />,
    dropdown: false,
    sub: [
      // { label: "Holidays", link: "/settings/holidays" },
      // { label: "Weekends", link: "/settings/weekends" },
      // { label: "Week Start", link: "/settings/weekstart" },
      { label: "Date Format", link: "/settings/dateformat" },
      { label: "Currency", link: "/settings/currency" },
      { label: "Membership", link: "/settings/membership" },
    ],
  },
];
