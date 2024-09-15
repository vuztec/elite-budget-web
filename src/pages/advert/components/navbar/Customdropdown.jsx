import React, { useState, useRef } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

function CustomDropdown({ options, title }) {
  const [isOpen, setIsOpen] = useState(false); // To toggle dropdown visibility
  const [selectedItem, setSelectedItem] = useState(title); // Selected item
  const dropdownRef = useRef(null);

  // Handle outside click to close the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add/remove event listener for outside click
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle item selection
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center gap-2 ">
        {selectedItem} <TiArrowSortedDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectItem(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
