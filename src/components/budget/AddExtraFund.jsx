import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Select from '../Select';
import Loading from '../Loader';
import Button from '../Button';
import { useQueryClient, useQuery } from 'react-query';
import { IoMdSend } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { getBankAccountNames } from '../../config/api';
import { formatDateForForm } from '../../utils';

export const AddExtraFund = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { Date: formatDateForForm(new Date()) },
  });

  useEffect(() => {
    if (recordData?.id) {
      setValue('Owner', recordData.Owner);
      setValue('Date', formatDateForForm(new Date(recordData.Date)));
      setValue('Description', recordData.Description);
      setValue('Type', recordData.Type);
      setValue('Amount', recordData.Amount);
    } else {
      setValue('Date', formatDateForForm(new Date()));
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (!recordData?.id)
      axios
        .post('/api/extra-funds-tracker', data)
        .then(({ data }) => {
          queryClient.setQueryData(['extrafunds'], (prev) => (prev ? [...prev, data] : [data]));
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    else
      axios
        .patch('/api/extra-funds-tracker/' + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(['extrafunds'], (prev) =>
            prev.map((fund) => (fund.id === numericSelectedID ? { ...fund, ...data } : fund)),
          );
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? 'UPDATE EXTRA FUND RECORD' : 'ADD NEW EXTRA FUND RECORD'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Select
                name="Owner"
                label="Transaction Owner"
                defaultValue="Self"
                options={[
                  { value: 'Self', label: 'Self' },
                  { value: 'Partner', label: 'Partner' },
                  { value: 'Joint', label: 'Joint' },
                ]}
                className="w-full rounded"
                register={register('Owner', {
                  required: 'Name is required!',
                })}
                error={errors.Owner ? errors.Owner.message : ''}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Select Date"
                type="date"
                name="Date"
                label="Date"
                className="w-full rounded"
                register={register('Date', {
                  valueAsDate: true,
                  required: 'Date is required!',
                })}
                error={errors.Date ? errors.Date.message : ''}
              />
              <Textbox
                placeholder="Enter a description for this record"
                type="text"
                name="Description"
                label="Description"
                className="w-full rounded"
                register={register('Description', {
                  required: 'Description is required!',
                })}
                error={errors.Description ? errors.Description.message : ''}
              />
            </div>

            <div className="flex flex-col gap-6 w-full">
              <Select
                name="Type"
                label="Type"
                defaultValue="Credit"
                options={[
                  { value: 'Withdrawal', label: 'Withdrawal (-)' },
                  { value: 'Credit', label: 'Credit (+)' },
                ]}
                className="w-full rounded"
                register={register('Type', {
                  required: 'Type is required!',
                })}
                error={errors.Type ? errors.Type.message : ''}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="Amount"
                label="Amount"
                className="w-full rounded"
                register={register('Amount', {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || 'Amount must be greater than  or equal to zero',
                })}
                error={errors.Amount ? errors.Amount.message : ''}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
              <Button
                type="submit"
                className="w-fit flex flex-row-reverse items-center gap-1 text-white bg-black"
                label="Enter"
                icon={<IoMdSend />}
              />

              <Button
                type="button"
                className="bg-gray-300 flex flex-row-reverse items-center gap-1 text-black"
                onClick={() => setOpen(false)}
                label="Cancel"
                icon={<TiCancel />}
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddExtraFund;
