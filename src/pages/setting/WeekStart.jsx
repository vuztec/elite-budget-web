import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd, IoMdCalendar } from "react-icons/io";
import Loading from "../../components/Loader";
import ConfirmationDialog from "../../components/Dialogs";
import clsx from "clsx";
import AddWeekStart from "../../components/setting/AddWeekStart";
import { getWeekStart } from "../../config/api";
import { useQuery, useQueryClient } from "react-query";
import socket from "../../utils/socket";
import { FaEdit } from "react-icons/fa";
import { RiCalendarEventFill, RiDeleteBin2Fill } from "react-icons/ri";
import { themeColors } from "../../utils";
import { getActiveAccount, getAddProjectPermission } from "../../utils/permissions";
import Package from "../../package/Package";

export const WeekStart = () => {
  const queryClient = useQueryClient();

  const { user: currentUser, root } = useUserStore();
  const activeAccount = getActiveAccount(root);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: weekStartData, status: isWeekStartLoaded } = useQuery({
    queryKey: ["weekstart"],
    queryFn: getWeekStart,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (isWeekStartLoaded === "success") {
      const filteredData = weekStartData;
      const sub = root.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        setGridData(filteredData);
      } else {
        setGridData([]);
      }
      setIsDataLoaded(true);
    }
  }, [weekStartData, isWeekStartLoaded, root]);

  useEffect(() => {
    socket?.on("weekstartDeleted", (weekstartId) => {
      console.log("Weekstart id ---------", weekstartId);
      // setWeekStartData((prevWeekstarts) =>
      //   prevWeekstarts.filter((weekstart) => weekstart.id !== weekstartId)
      // );

      queryClient.setQueryData(["weekstart"], (prevWeek) => prevWeek.filter((week) => week.id !== weekstartId));
      setOpenDialog(false);
    });

    return () => {
      socket?.off("weekstartDeleted");
    };
  }, []);

  const deleteHandler = async (selected) => {
    try {
      socket?.emit("deleteWeekstart", selected);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteClick = (id) => {
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
        <th className="border-l border-gray-300 p-2">Weekday</th>
        {getAddProjectPermission(currentUser) && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ weekday }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-max p-2 whitespace-nowrap border-l border-gray-200">{weekday.Weekday}</td>

      {getAddProjectPermission(currentUser) && (
        <td className="min-w-max p-2 border-l border-gray-200">
          <div className="flex items-center text-left gap-3 justify-start">
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer")}
              onClick={() => editClick(weekday)}
            />
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer")}
              onClick={() => deleteClick(weekday.id)}
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
                  <RiCalendarEventFill className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="Week Start Day" />
                </div>

                {getAddProjectPermission(currentUser) && gridData.length < 1 && (
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
                      {gridData.map((weekday, index) => (
                        <TableRow key={index} weekday={weekday} />
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

      <AddWeekStart
        socket={socket}
        // setWeekStartData={setWeekStartData}
        open={open}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};
