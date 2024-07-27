import React, { useEffect, useState } from "react";
import UserAvatar from "./team/UserAvatar";
import useUserStore from "../app/user";
import { useLocation } from "react-router-dom";
import { SidebarLinks } from "../utils/sidebar.data";
import axios from "../config/axios";

const Navbar = () => {
  const { setSidebar, setUser, user } = useUserStore();
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  useEffect(() => {
    const data = SidebarLinks.find((item) =>
      item.link ? item.link === location.pathname : item.sub.find((sub_item) => sub_item.link === location.pathname)
    );

    if (data?.sub?.length) {
      const sub = data.sub.find((sub_item) => sub_item.link === location.pathname);
      setTitle(sub?.title);
    } else setTitle(data?.title);
  }, [location.pathname]);

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky top-0">
      <div className="w-full flex gap-4">
        <button onClick={() => setSidebar()} className="text-2xl text-gray-500 block md:hidden">
          ☰
        </button>

        <div className="w-full flex justify-center items-center py-2 px-3 gap-2 rounded-full">
          <h1 className="font-bold uppercase hidden md:block"> {title === "Home" ? title : title + " for " + (user?.FullName || "")}</h1>
          <h1 className="font-bold uppercase md:hidden"> {title}</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
