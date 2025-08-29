import clsx from 'clsx';
import { ModalWrapper2 } from './ModalWrapper';
import Button from './Button';
import PrivacyPolicy from '../pages/policy/PrivacyPolicy';
import { TiCancel } from 'react-icons/ti';
import TermsAndConditions from '../pages/policy/TermsAndConditions';
import Video from './resource/Video';
import { getTransactionOfCustomer } from '../config/api';
import { useQuery } from 'react-query';
import StripeListView from './stripe/StripeListView';

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
