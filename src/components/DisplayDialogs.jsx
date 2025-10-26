import clsx from 'clsx';
import { ModalWrapper2 } from './ModalWrapper';
import Button from './Button';
import PrivacyPolicy from '../pages/policy/PrivacyPolicy';
import { TiCancel } from 'react-icons/ti';
import TermsAndConditions from '../pages/policy/TermsAndConditions';
import Video from './resource/Video';
import { getTransactionOfCustomer, getUserAudits } from '../config/api';
import { useQuery } from 'react-query';
import StripeListView from './stripe/StripeListView';
import axios from '../config/axios';

export function PrivacyDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ModalWrapper2 open={open} handleClose={handleClose} size={'lg'}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <div className="w-full flex flex-col items-center justify-start gap-0">
            <p className={clsx('font-bold items-left px-3 py-2 rounded-md', `bg-[whitesmoke] uppercase`)}>
              READ THE Privacy Policy
            </p>
            <p className="text-red-500">The acceptance button is at the end (bottom).</p>
          </div>

          <div className="w-full items-left">
            <PrivacyPolicy isDialog={true} />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => handleClose()}
              label="Close"
              icon={<TiCancel />}
            />
          </div>
        </div>
      </ModalWrapper2>
    </>
  );
}

export function TermsDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ModalWrapper2 open={open} handleClose={handleClose} size={'lg'}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <div className="w-full flex flex-col items-center justify-start gap-0">
            <p className={clsx('font-bold items-left px-3 py-2 rounded-md', `bg-[whitesmoke] uppercase`)}>
              READ THE TERMS & CONDITIONS OF USE
            </p>
            <p className="text-red-500">The acceptance button is at the end (bottom).</p>
          </div>

          <div className="w-full items-left">
            <TermsAndConditions isDialog={true} />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => handleClose()}
              label="Close"
              icon={<TiCancel />}
            />
          </div>
        </div>
      </ModalWrapper2>
    </>
  );
}

export function VideoDialog({ open, setOpen, url, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper2 open={open} handleClose={handleClose} size={'lg'}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p className="w-full font-bold items-left px-3 py-2 rounded-md text-white bg-black uppercase">{title}</p>
          <div className="w-full items-left">
            <Video url={url} />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={handleClose}
              label="Close"
              icon={<TiCancel />}
            />
          </div>
        </div>
      </ModalWrapper2>
    </>
  );
}

export function TransactionDialog({ open, setOpen, user, title }) {
  const customer_id = user?.StripeId;

  const { data: transactions, status: isTransactionLoaded } = useQuery({
    queryKey: ['transactions', customer_id],
    queryFn: () => getTransactionOfCustomer(customer_id),
    staleTime: 1000 * 60 * 60,
    enabled: !!customer_id,
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper2 open={open} handleClose={handleClose} size={'xl'}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p className="w-full font-bold items-left px-3 py-2 rounded-md text-white bg-black uppercase">{title}</p>
          <div className="w-full items-left">
            <StripeListView gridData={transactions} />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={handleClose}
              label="Close"
              icon={<TiCancel />}
            />
          </div>
        </div>
      </ModalWrapper2>
    </>
  );
}

export function AuditDialog({ open, setOpen, user, title }) {
  const userId = user?.id;

  const { data: audits, status: isAuditLoaded } = useQuery({
    queryKey: ['audits', userId],
    queryFn: () => getUserAudits(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const AuditListView = ({ gridData }) => {
    if (!gridData || gridData.length === 0) {
      return <div className="text-center py-8 text-gray-500">No audit records found for this user.</div>;
    }

    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="border border-gray-300 p-3 text-left">Action</th>
              <th className="border border-gray-300 p-3 text-left">Auto Renewal Status</th>
              <th className="border border-gray-300 p-3 text-left">Date & Time</th>
              <th className="border border-gray-300 p-3 text-left">IP Address</th>
              <th className="border border-gray-300 p-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {gridData?.map((audit, index) => (
              <tr key={audit.id || index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  <span
                    className={clsx(
                      'px-2 py-1 rounded-md text-sm font-medium',
                      audit.Action === 'Auto Renewal Enabled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    )}
                  >
                    {audit.Action}
                  </span>
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <span
                    className={clsx(
                      'px-2 py-1 rounded-md text-sm font-medium',
                      audit.AutoRenewalStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    )}
                  >
                    {audit.AutoRenewalStatus ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">
                  {audit.ActionDate ? new Date(audit.ActionDate).toLocaleString() : 'N/A'}
                </td>
                <td className="border border-gray-300 p-3">{audit.IpAddress || 'N/A'}</td>
                <td className="border border-gray-300 p-3">{audit.Notes || 'No notes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <ModalWrapper2 open={open} handleClose={handleClose} size={'xl'}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p className="w-full font-bold items-left px-3 py-2 rounded-md text-white bg-black uppercase">
            Audit History - {title}
          </p>

          <div className="w-full items-left max-h-96 overflow-y-auto">
            {isAuditLoaded === 'loading' ? (
              <div className="text-center py-8">Loading audit records...</div>
            ) : isAuditLoaded === 'error' ? (
              <div className="text-center py-8 text-red-500">Error loading audit records</div>
            ) : (
              <AuditListView gridData={audits} />
            )}
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={handleClose}
              label="Close"
              icon={<TiCancel />}
            />
          </div>
        </div>
      </ModalWrapper2>
    </>
  );
}
