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
    ],
  },
];
