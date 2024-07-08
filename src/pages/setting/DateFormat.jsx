import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import ConfirmationDialog from "../../components/Dialogs";
import AddDateFormat from "../../components/setting/AddDateFormat";
import { getDateFormat } from "../../config/api";
import { useQuery } from "react-query";
import { FaEdit } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const DateFormat = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { user: currentUser, root } = useUserStore();
  const activeAccount = getActiveAccount(root);

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (isDateFormatLoaded === "success") {
      const filteredData = dateFormatData;
      const sub = root?.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        setGridData(filteredData);
      } else {
        setGridData([]);
      }
      setIsDataLoaded(true);
    }
  }, [dateFormatData, isDateFormatLoaded, root]);

  // const deleteClick = (id) => {
  //   setSelected(id);
  //   setOpenDialog(true);
  // };

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
        <th className="border-l border-gray-300 p-2">Date Format</th>
        <th className="border-l border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ format }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-max p-2 whitespace-nowrap border-l border-gray-200">{format.Format}</td>
      <td className="min-w-max p-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <FaEdit
            className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer")}
            onClick={() => editClick(format)}
          />
          {/* <RiDeleteBin2Fill
              className={clsx(
                `text-deletecolor`,
                "hover:text-red-500 font-semibold cursor-pointer"
              )}
              onClick={() => deleteClick(format.id)}
            /> */}
        </div>
      </td>
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
                  <CiCalendarDate className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="DATE FORMAT" />
                </div>

                {gridData.length < 1 && (
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
                      {gridData?.map((format, index) => (
                        <TableRow key={index} format={format} />
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

      <AddDateFormat serverUrl={serverUrl} open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};
