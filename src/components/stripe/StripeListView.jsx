import React, { useEffect, useState } from 'react';
import useUserStore from '../../app/user';
import clsx from 'clsx';
import Button from '../Button';
import { BsYoutube } from 'react-icons/bs';
import { VideoDialog } from '../DisplayDialogs';
import { format } from 'date-fns';
import moment from 'moment';

export const StripeListView = ({ gridData, hasClass }) => {
  const TableHeader = () => (
    <thead className="sticky top-0 z-9">
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Amount</th>
        <th className="border-l border-gray-300 p-2">Customer</th>
        <th className="border-l border-gray-300 p-2">Payment Method</th>

        <th className="border-l border-gray-300 p-2">Date</th>
        <th className="border-l border-gray-300 p-2">Refunded Date</th>
        <th className="border-l border-gray-300 p-2">Status</th>
        <th className="border-l border-gray-300 p-2">Decline</th>
      </tr>
    </thead>
  );
  const TableRow = ({ record }) => {
    return (
      <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.amount_due}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.customer_name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {gridData?.length > -1 && (
        <div className="w-full h-fit bg-white mt-4 shadow-md rounded-xl">
          <div className={clsx('overflow-y-auto block overflow-x-auto', hasClass ? 'h-fit' : 'h-[calc(100vh-240px)]')}>
            <table className="w-[97%] m-5">
              <TableHeader />
              <tbody className="h-full overflow-y-auto overflow-x-auto">
                {gridData.map((rec, recIndex) => (
                  <TableRow key={recIndex} record={rec} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default StripeListView;
