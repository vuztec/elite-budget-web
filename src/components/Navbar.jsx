import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserAvatar from "./team/UserAvatar";
import useUserStore from "../app/user";
import { useLocation } from "react-router-dom";
import { SidebarLinks } from "../utils/sidebar.data";
import { useQueryClient, useQuery } from "react-query";

const Navbar = () => {
  const { setSidebar, isRefresh, setIsRefresh } = useUserStore();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isRefresh) {
      setIsRefresh(false);
      window.location.reload();
    }
  }, [isRefresh]);

  // useEffect(() => {
  //   axios
  //     .get(SERVER_URL + "/api/auth/me")
  //     .then(({ data }) => {
  //       setUser(data.resource);
  //     })
  //     .catch((err) => {
  //       console.log("Error : ", err);
  //     });
  // }, []);

  useEffect(() => {
    const data = SidebarLinks.find((item) =>
      item.link ? item.link === location.pathname : item.sub.find((sub_item) => sub_item.link === location.pathname)
    );

    if (data?.sub?.length) {
      const sub = data?.sub[parseInt(tab)];
      setTitle(data?.label + " - " + sub?.label);
    } else setTitle(data?.label);
  }, [location.pathname, tab]);

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky top-0">
      <div className="w-full flex gap-4">
        <button onClick={() => setSidebar()} className="text-2xl text-gray-500 block md:hidden">
          ☰
        </button>

        <div className="w-full flex justify-center items-center py-2 px-3 gap-2 rounded-full">
          <h1 className="font-bold">{title}</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
