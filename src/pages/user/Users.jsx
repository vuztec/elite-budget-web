import React, { useEffect, useState } from 'react';
import useUserStore from '../../app/user';
import Loading from '../../components/Loader';
import { getInitials } from '../../utils';
import clsx from 'clsx';
import ConfirmationDialog from '../../components/Dialogs';
import { useQuery, useQueryClient } from 'react-query';
import { FaSquareXmark } from 'react-icons/fa6';
import { MdPeople } from 'react-icons/md';
import { FaCheckSquare, FaStripeS } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../config/axios';
import { getStripeUsers, getUsers } from '../../config/api';
import { getFormattedDateSubscription, getIsTrial, getRenewalDate } from '../../utils/budget.calculation';
import Button from '../../components/Button';
import { TransactionDialog, AuditDialog } from '../../components/DisplayDialogs';
import { Tabs2 } from '../../components/Tabs';

export const Users = () => {
  const { user: currentUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    currentUser?.id !== 1 && currentUser?.id !== 2 && currentUser?.id !== 3 && currentUser?.id !== 6 && navigate('/');
  }, [currentUser, navigate]);
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openAccessDialog, setOpenAccessDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAudit, setOpenAudit] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [Title, setTitle] = useState('');

  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(0);
  const tab = searchParams.get('tab');

  useEffect(() => {
    setCurrentTab(Number(tab));
    if (Number(tab) === 0) {
      setTitle('Subscribers');
    } else if (Number(tab) === 1) {
      setTitle('Testing Users');
    }
  }, [tab]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: users, status: isUserLoaded } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 60,
  });

  // const { data: customers, status: isCustomerLoaded } = useQuery({
  //   queryKey: ['customers'],
  //   queryFn: getStripeUsers,
  //   staleTime: 1000 * 60 * 60,
  // });

  useEffect(() => {
    if (isUserLoaded === 'success') {
      const filteredIds = [2, 14, 7, 8, 9, 10, 11, 25];
      const filtered = users.filter((u) => !filteredIds.includes(Number(u?.id)));
      setGridData(filtered);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [users, isUserLoaded]);

  const deleteHandler = async (selected) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/attachment/delete-file?type=resource_id&id=${selected}`);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const accessHandler = async () => {
    setIsLoading(true);

    axios
      .patch(`/api/rootusers/${selected}/FreeAccess`)
      .then(({ data }) => {
        queryClient.setQueryData(['users'], (prev) =>
          prev.map((user) => (user.id === selected ? { ...user, ...data } : user)),
        );
        setOpenAccessDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const statusHandler = async () => {
    setIsLoading(true);

    axios
      .patch(`/api/rootusers/${selected}/Status`)
      .then(({ data }) => {
        queryClient.setQueryData(['users'], (prev) =>
          prev.map((user) => (user.id === selected ? { ...user, ...data } : user)),
        );
        setOpenStatusDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleStatusChange = (user) => {
    setSelected(user.id);
    if (user.Status === 'Active') setPrompt(() => 'Are you sure you want to DENY this subscriber access?');
    else setPrompt(() => 'Are you sure you want to GRANT this subscriber access?');
    setOpenStatusDialog(true);
  };
  const handleAccessChange = (user) => {
    setSelected(user.id);
    if (!user.FreeAccess) setPrompt(() => 'Are you sure you want to GRANT this subscriber free access?');
    else setPrompt(() => 'Are you sure you want to REMOVE free access?');
    setOpenAccessDialog(true);
  };

  const openTransaction = (el) => {
    setOpen(true);
    setSelected(el);
  };

  const openAuditDialog = (el) => {
    setSelected(el);
    setOpenAudit(true);
  };

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        <th className="border-l border-gray-300 p-2">Email</th>
        <th className="border-l border-gray-300 p-2">Coupon Used</th>
        <th className="border-l border-gray-300 p-2">Transactions</th>

        <th className="border-l border-gray-300 p-2">Allowed User</th>
        <th className="border-l border-gray-300 p-2">Free Access</th>
        <th className="border-l border-gray-300 p-2">License Type</th>
        <th className="border-l border-gray-300 p-2">Annual Subscription</th>
        <th className="border-l border-gray-300 p-2">Subscription Status</th>
        <th className="border-l border-gray-300 p-2">Account Created On</th>
        <th className="border-l border-gray-300 p-2">Subscription Date</th>
        <th className="border-l border-gray-300 p-2">Renewal Date</th>
        <th className="border-l border-gray-300 p-2">Auto Renewal</th>
        <th className="border-l border-gray-300 p-2">Auto-Renewal Updated On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx('w-9 h-9 rounded-full text-white flex items-center justify-center text-sm', `bg-black`)}>
            <span className="text-xs md:text-sm text-center">{getInitials(user?.FullName)}</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{user?.FullName}</span>
            <span className="text-xs italic">{user?.Country}</span>
          </div>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <span className="text-black">{user?.Email}</span>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <span className="text-black">{user?.Coupon}</span>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="rounded-md text-black">
          <Button
            label={'Stripe Transaction'}
            icon={<FaStripeS />}
            className={clsx(
              'flex flex-row-reverse gap-2 p-1 rounded-full items-center text-white hover:bg-green-600',
              `bg-[#6761fb] hover:text-white`,
            )}
            onClick={() => openTransaction(user)}
          />
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={user?.Status === 'Active' ? true : false}
            onChange={() => handleStatusChange(user)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={user?.FreeAccess}
            onChange={() => handleAccessChange(user)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {user?.FreeAccess ? (
          ''
        ) : getIsTrial(user) ? (
          <p className="text-orange-700 bg-orange-200 py-1 px-2 rounded-md">14-Day FREE Trial</p>
        ) : (
          <p className="text-green-700 bg-green-200 py-1 px-2 rounded-md">Paid License</p>
        )}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {user?.FreeAccess ? (
          ''
        ) : getIsTrial(user) ? (
          <p className="text-orange-700 bg-orange-200 py-1 px-2 rounded-md">FREE</p>
        ) : (
          <p className="text-green-700 bg-green-200 py-1 px-2 rounded-md">$95.88</p>
        )}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <p className="">
          {user?.FreeAccess ? (
            ''
          ) : (user?.SubscribeDate && getIsTrial(user)) || (user?.Payment && !user?.IsExpired) ? (
            <div className="flex items-center gap-1 bg-green-200 text-green-700  py-1 px-2 rounded-md">
              <FaCheckSquare />
              <p>Active</p>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-red-200 text-red-700 py-1 px-2 rounded-md">
              <FaSquareXmark />
              <p>Inactive</p>
            </div>
          )}
        </p>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {getFormattedDateSubscription(currentUser, user?.CreatedAt)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {user?.FreeAccess
          ? ''
          : (user?.SubscribeDate && getIsTrial(user)) || (user?.Payment && !user?.IsExpired)
            ? getFormattedDateSubscription(currentUser, getIsTrial(user) ? user?.CreatedAt : user?.SubscribeDate)
            : ''}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {user?.FreeAccess
          ? ''
          : (user?.SubscribeDate && getIsTrial(user)) || (user?.Payment && !user?.IsExpired)
            ? getFormattedDateSubscription(
                currentUser,
                getIsTrial(user)
                  ? new Date(new Date(user?.CreatedAt).setDate(new Date(user?.CreatedAt).getDate() + 14))
                  : getRenewalDate(user),
              )
            : ''}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <p className="text-2xl">
          {user?.FreeAccess ? (
            ''
          ) : user?.Auto_Renewal ? (
            <FaCheckSquare className="text-green-500" />
          ) : (
            <FaSquareXmark className="text-red-500" />
          )}
        </p>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        {user?.FreeAccess ? (
          ''
        ) : user?.Audits && user?.Audits.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-sm">
                {user?.Audits[0]?.ActionDate ? new Date(user?.Audits[0]?.ActionDate).toLocaleString() : ''}
              </span>
              <span className="text-xs text-gray-500 italic">{user?.Audits?.[0]?.Action}</span>
            </div>
            <Button
              label={'View All Audits'}
              className={clsx(
                'flex flex-row-reverse gap-2 p-1 rounded-full items-center text-white hover:bg-blue-600 text-xs',
                `bg-blue-500 hover:text-white`,
              )}
              onClick={() => openAuditDialog(user)}
            />
          </div>
        ) : (
          <span className="text-gray-400 text-sm italic"></span>
        )}
      </td>
    </tr>
  );
  const TABS = [{ title: 'Subscribers' }, { title: 'Testing Users' }];

  return !isDataLoaded ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      {isDataLoaded && (
        <>
          <div className="w-full mt-5 mb-5 shadow-md rounded bg-white text-black">
            <div className="flex items-center justify-between p-5">
              <div className="text-2xl flex items-center gap-2">
                <MdPeople />
                <p className="uppercase">{Title}</p>
              </div>
            </div>

            <div className="w-full h-[calc(100vh-260px)] overflow-y-auto overflow-x-auto bg-white rounded">
              <div className="">
                <Tabs2 tabs={TABS} selected={currentTab}>
                  {currentTab === 0 && (
                    <table className="w-[97%] mx-5">
                      <TableHeader />
                      <tbody>
                        {gridData
                          ?.filter((u) => !u?.IsTrash)
                          ?.map((user, index) => (
                            <TableRow key={user?.id ?? index} user={user} />
                          ))}
                      </tbody>
                    </table>
                  )}

                  {currentTab === 1 && (
                    <table className="w-[97%] mx-5">
                      <TableHeader />
                      <tbody>
                        {gridData
                          ?.filter((u) => u?.IsTrash)
                          ?.map((user, index) => (
                            <TableRow key={user?.id ?? index} user={user} />
                          ))}
                      </tbody>
                    </table>
                  )}
                </Tabs2>
              </div>
            </div>
          </div>
        </>
      )}
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        isLoading={isLoading}
        onClick={() => deleteHandler(selected)}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openAccessDialog}
        setOpen={setOpenAccessDialog}
        msg={prompt}
        buttonText={'Yes'}
        onClick={() => accessHandler()}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openStatusDialog}
        setOpen={setOpenStatusDialog}
        msg={prompt}
        buttonText={'Yes'}
        onClick={() => statusHandler()}
      />
      <TransactionDialog open={open} setOpen={setOpen} user={selected} title={selected?.FullName} />
      <AuditDialog open={openAudit} setOpen={setOpenAudit} user={selected} title={selected?.FullName} />
    </>
  );
};
