import { useState } from 'react';
import { IoMenu } from 'react-icons/io5'; // Importing Menu icon
import { IoClose } from 'react-icons/io5'; // Importing Close icon
import CustomDropdown from './Customdropdown.jsx';
import Logo from '../../../../assets/logo.png';

function Navbar() {
  // State for drawer open/close
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Define options for the dropdown
  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between lg:bg-[#E0E0E0] md:bg-[#E0E0E0] bg-white py-2 px-8">
      {/* Mobile View: Logo and Menu Button */}
      <div className="flex  w-full items-center justify-end lg:hidden mb-4">
        {/* Mobile menu icon */}
        <button onClick={toggleDrawer} className="px-4 py-2 border bg-[#3F3F3F] text-white lg:hidden">
          {isDrawerOpen ? <IoClose className="text-xl" /> : <IoMenu className="text-xl" />}
        </button>
      </div>

      {/* Logo Section for larger screens */}
      <div className="hidden lg:flex lg:w-1/4 justify-start">
        <img src={Logo} alt="Logo" className="h-20 w-32" />
      </div>

      {/* Navigation Items */}
      {/* <ul className="hidden lg:flex lg:flex-row lg:w-2/4 lg:justify-between items-center space-y-4 lg:space-y-0 text-gray-700">
        <li className="cursor-pointer text-[#000000] font-medium text-xl">Home</li>
        <li className="cursor-pointer text-[#000000] font-medium text-xl">
          App
        </li>
        <li className="cursor-pointer text-[#000000] font-medium text-xl">
          Dashboard Examples
        </li>
        <li className="cursor-pointer text-[#000000] font-medium text-xl">Pricing</li>
        <li className="cursor-pointer text-[#000000] font-medium text-xl">About</li>
      </ul> */}

      {/* Buttons */}
      <div className="hidden lg:w-1/4 lg:flex justify-center lg:justify-end items-center gap-4">
        <a href="/login" className="px-6 py-2 border rounded-full bg-[#3F3F3F] text-white">
          Login
        </a>
        <a href="/login" className="px-6 py-2 border rounded-full bg-[#61BD4F] text-white">
          Signup
        </a>
      </div>

      {/* Drawer for small screens */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-3/4 h-full bg-[#E0E0E0] shadow-lg z-50">
          <ul className="flex flex-col items-start p-4 space-y-4 text-gray-700">
            <li onClick={closeDrawer} className="cursor-pointer text-[#000000] font-medium text-xl">
              Home
            </li>
            <li onClick={closeDrawer} className="cursor-pointer text-[#000000] font-medium text-xl">
              <CustomDropdown options={dropdownOptions} title="Apps" />
            </li>
            <li onClick={closeDrawer} className="cursor-pointer text-[#000000] font-medium text-xl">
              <CustomDropdown options={dropdownOptions} title="Dashboard Examples" />
            </li>
            <li onClick={closeDrawer} className="cursor-pointer text-[#000000] font-medium text-xl">
              Pricing
            </li>
            <li onClick={closeDrawer} className="cursor-pointer text-[#000000] font-medium text-xl">
              About
            </li>
          </ul>
          <div className="flex flex-col p-4 space-y-4">
            <a href="/login" className="px-6 py-2 border rounded-full bg-[#3F3F3F] text-white w-full">
              Login
            </a>
            <a href="/login" className="px-6 py-2 border rounded-full bg-[#61BD4F] text-white w-full">
              Signup
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
