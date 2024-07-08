import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import ConfirmationDialog, { UserAction } from "../../components/Dialogs";
import { format } from "date-fns";
import AddHoliday from "../../components/setting/AddHoliday";
import { getDateFormat, getHoliday } from "../../config/api";
import { useQuery, useQueryClient } from "react-query";
import { FaEdit, FaRegCalendarCheck, FaRegCalendarPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiFolderWarningLine } from "react-icons/ri";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { TbCalendarCancel } from "react-icons/tb";
import { getActiveAccount, getAddProjectPermission } from "../../utils/permissions";
import Package from "../../package/Package";

export const Holidays = () => {
  const queryClient = useQueryClient();
  const { user: currentUser, root } = useUserStore();
  const activeAccount = getActiveAccount(root);
  const setUser = useUserStore((state) => state.setUser);
  const [customDateFormat, setCustomDateFormat] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  const { data: holidayData, status: isHolidayLoaded } = useQuery({
    queryKey: ["holiday"],
    queryFn: getHoliday,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (isHolidayLoaded === "success" && isDateFormatLoaded === "success") {
      const filteredData = holidayData;
      const sub = root?.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        setGridData(filteredData);
      } else {
        setGridData([]);
      }
      const targetFormatData = dateFormatData?.find((item) => item.UserID === currentUser.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);
      setIsDataLoaded(true);
    }
  }, [holidayData, isHolidayLoaded, root, dateFormatData, isDateFormatLoaded, currentUser]);

  const userActionHandler = () => {};

  const deleteHandler = async (selected) => {
    try {
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteClick = (id) => {
    console.log(id, "deleteID");
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const addClick = () => {
    setSelected("");
    setOpen(true);
  };

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="border-l border-gray-300 p-2">Holiday</th>
        <th className="border-l border-gray-300 p-2">Date</th>
        {getAddProjectPermission(currentUser) && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ holiday }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-max p-2 whitespace-nowrap border-l border-gray-200">{holiday.Description}</td>

      <td className="min-w-max p-2 whitespace-nowrap border-l border-gray-200">
        <div className="flex gap-1 items-center text-left">
          <FaRegCalendarCheck className="text-startcolor hidden lg:block" />
          <p className="text-black">{holiday?.Holiday ? format(new Date(holiday?.Holiday), customDateFormat) : ""}</p>
        </div>
      </td>

      {getAddProjectPermission(currentUser) && (
        <td className="min-w-max p-2 border-l border-gray-200">
          <div className="flex items-center text-left gap-3 justify-start">
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(holiday)}
            />
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(holiday.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );

  return !isDataLoaded ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      {isDataLoaded &&
        (activeAccount ? (
          <>
            <div className="w-full mt-5 mb-5 shadow-md rounded bg-white">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2">
                  <TbCalendarCancel className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="Company Holidays" />
                </div>
                {getAddProjectPermission(currentUser) && (
                  <Button
                    label="Add New"
                    icon={<IoMdAdd className="text-lg" />}
                    className={clsx(
                      "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                      `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                    )}
                    onClick={() => addClick()}
                  />
                )}
              </div>

              <div className="w-full h-fit bg-white py-2 rounded">
                <div className="overflow-x-auto">
                  <table className="w-[97%] m-5">
                    <TableHeader />
                    <tbody>
                      {gridData.map((holiday, index) => (
                        <TableRow key={index} holiday={holiday} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Package />
        ))}

      <AddHoliday
        // setHolidayData={setHolidayData}
        open={open}
        customDateFormat={customDateFormat}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />

      <UserAction open={openAction} setOpen={setOpenAction} onClick={userActionHandler} />
    </>
  );
};
