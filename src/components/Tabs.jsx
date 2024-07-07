import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ selected, tab, tabs, children }) {
  const [_, setSearchParams] = useSearchParams();

  const handleSelected = (index) => {
    setSearchParams(`name=${tab}&tab=${index}`);
  };
  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group selectedIndex={selected}>
        <Tab.List className="flex space-x-6 rounded-xl p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              onClick={() => handleSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                  selected
                    ? "text-blue-700  border-b-2 border-blue-600"
                    : "text-gray-800  hover:text-blue-800"
                )
              }
            >
              {tab.icon}
              <span className="hidden sm:block">{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
