import React, { useEffect, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { IoMdArrowDropright } from 'react-icons/io';
import { SidebarLinks } from '../utils/sidebar.data';
import Logo from '../assets/logo.png';
import useUserStore from '../app/user';
import { GrClose } from 'react-icons/gr';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSideBarData] = useState(SidebarLinks);
  const { setSidebar, setDefaultSidebar, sidebar, user } = useUserStore();

  const path = location.pathname?.split('/')[1];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let sidebar = SidebarLinks;
    if (user?.id !== 1 && user?.id !== 2 && user?.id !== 3 && user?.id !== 6) {
      sidebar = SidebarLinks?.filter((s) => s?.label !== 'Subscribers');
    }
    setSideBarData(sidebar);
  }, [user, SidebarLinks]);
  useEffect(() => {
    if (width <= 1024 && sidebar) {
      setDefaultSidebar();
    }
  }, [width]);

  const NavLinks = ({ el }) => {
    const title = el.activename;

    const handleLink = () => {
      if (el.link) {
        navigate(el.link);
        setSideBarData((prev) => prev.map((item) => ({ ...item, dropdown: false })));
        setSidebar();
      } else {
        setSideBarData((prev) =>
          prev.map((item) =>
            item.label === el.label ? { ...item, dropdown: !item.dropdown } : { ...item, dropdown: false },
          ),
        );
      }
    };

    const handleSubMenu = () => {
      setSidebar();

      // if (window.innerWidth >= 768 && window.innerWidth <= 1024)
      //   setSideBarData((prev) =>
      //     prev.map((item) =>
      //       item.label === el.label ? { ...item, dropdown: !item.dropdown } : { ...item, dropdown: false },
      //     ),
      //   );
    };

    const isActive =
      (title === 'home' && !path) ||
      (title !== 'home' && path && (path === el?.link?.split('/')[0] || location.pathname.includes(title)));

    return (
      <div onClick={handleLink} className={clsx(' w-full flex flex-col cursor-pointer ')}>
        <div
          className={clsx(
            'group w-full flex justify-between gap-2 px-3 py-2 items-center rounded-full text-gray-800 text-base hover:bg-[whitesmoke]',
            isActive ? 'bg-black ' : '',
          )}
        >
          <div
            className={`flex items-center gap-4 ${
              isActive ? 'text-white group-hover:text-black' : 'text-black group-hover:text-gray-500'
            } `}
          >
            <div className="text-lg">{el.icon}</div>
            <span className="lg:block">{el.label}</span>
          </div>
          <div
            className={
              el.sub?.length
                ? isActive
                  ? 'text-white group-hover:text-black'
                  : 'text-black group-hover:text-gray-500'
                : 'hidden'
            }
          >
            <IoMdArrowDropright />
          </div>
        </div>
        <div
          className={`lg:static lg:bg-white lg:rounded-none lg:ml-12 ${
            el.dropdown && el.sub?.length ? 'ml-12 transition-all' : 'hidden transition-all'
          }`}
        >
          {el.sub?.map((item, index) => (
            <div
              className={`w-full text-md leading-6 px-3 py-1 rounded-full hover:bg-[#2564ed15]  ${
                item.link === location.pathname ? 'text-black bg-gray-200 ' : 'text-[#A7A7A7]'
              }`}
              key={index}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={item.link} className="w-full flex" onClick={() => handleSubMenu(index)}>
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
      className="w-72 bg-white h-screen lg:h-auto overflow-y-auto lg:w-full flex flex-col py-5 pt-6 lg:px-5 overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between">
        <h1 className="flex items-center">
          <img src={Logo} alt="logo" className="h-8 md:h-16 lg:h-32" />
        </h1>
        <button className="lg:hidden mr-4 p-2 h-min rounded-full hover:bg-[#2564ed15]" onClick={setSidebar}>
          <GrClose />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-y-3 py-2 mt-6">
        {sidebarData.map((item, index) => (
          <NavLinks el={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
