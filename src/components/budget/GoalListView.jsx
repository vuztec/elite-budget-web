import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import clsx from 'clsx';

import { useQueryClient } from 'react-query';
import ConfirmationDialog from '../Dialogs';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import AddGoal from './AddGoal';
import ToolTip from '../tooltip';
import Sort from '../sort';

export const GoalListView = ({ gridData, goal, maingoals, Max, Total }) => {
  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [order, setOrder] = useState(['default', 'default']);
  const [data, setData] = useState(gridData);

  useEffect(() => {
    setData(gridData);
  }, [gridData]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);

    axios
      .delete(`/api/project/${selected}`)
      .then(({ data }) => {
        queryClient.setQueryData(['projects'], (prev) => prev.filter((project) => project.id !== selected));
        setOpenDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-[whitesmoke] text-black border border-gray-300 text-left">
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Name
            <Sort
              order={order}
              setOrder={setOrder}
              column={1}
              name={'Category'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Goal
            <Sort
              order={order}
              setOrder={setOrder}
              column={2}
              name={'Percentage'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>

        <th className="p-2 border-l border-gray-300">Edit</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 hover:bg-gray-400/10 text-left">
      <td className="xl:w-1/3 whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">
            {record?.Category}
          </span>
        </div>
      </td>

      <td className="xl:w-1/3 whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.Percentage}%</p>
        </div>
      </td>

      <td className="xl:w-1/3 p-2 border-l border-r border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <div className="group flex relative">
            <FaEdit
              className={clsx(`text-editcolor`, 'hover:text-orange-500 font-semibold cursor-pointer sm:px-0')}
              onClick={() => editClick(record)}
            />
            <ToolTip text={'Edit'} />
          </div>
        </div>
      </td>
    </tr>
  );

  const TableTotal = () => (
    <tr className="border bg-[whitesmoke] font-bold border-gray-300 hover:bg-gray-400/10 text-left">
      <td className="xl:w-1/3 whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">Sum %</span>
        </div>
      </td>

      <td className="xl:w-1/3 whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{Total}%</p>
        </div>
      </td>

      <td className="xl:w-1/3 p-2 border-l border-r border-gray-200"></td>
    </tr>
  );

  const TableGoal = () => (
    <tr className="border bg-[whitesmoke] font-bold border-gray-300 hover:bg-gray-400/10 text-left">
      <td className="xl:w-1/3 whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">Maximum Goal %</span>
        </div>
      </td>

      <td className="xl:w-1/3 whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{Max}%</p>
        </div>
      </td>

      <td className="xl:w-1/3 p-2 border-l border-r border-gray-200"></td>
    </tr>
  );

  return (
    <>
      {gridData?.length > -1 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded text-sm xl:text-[16px]">
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5 mr-5 -mb-5">
                <thead>
                  <tr>
                    <th className="p-2 w-full uppercase bg-[whitesmoke] text-black  border-l border-t border-r border-gray-300 flex items-center justify-center">
                      {goal} GOALS
                    </th>
                  </tr>
                </thead>
              </table>
              <table className="w-[97%] m-5">
                <TableHeader />
                <tbody>
                  {gridData?.map((record, index) => (
                    <TableRow key={index} record={record} />
                  ))}
                  <TableTotal />
                  <TableGoal />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <AddGoal open={open} setOpen={setOpen} recordData={selected} type={goal} goals={gridData} maingoals={maingoals} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </>
  );
};
