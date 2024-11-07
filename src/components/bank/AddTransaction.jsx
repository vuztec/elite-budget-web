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
import { formatDateForForm } from '../../utils';

export const AddTransaction = ({ open, handleClose, recordData, banks }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (recordData?.id) {
      setValue('BankName', recordData.BankAccountName.id);
      setValue('Date', formatDateForForm(new Date(recordData.Date.split('T')[0] + 'T00:00:00')));
      setValue('Description', recordData.Description);
      setValue('Type', recordData.Type);
      setValue('Amount', recordData.Amount ? Number(recordData.Amount).toFixed(2) : '');
      setValue('IsCleared', recordData.IsCleared);
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
        .post('/api/bank-accounts/transaction', data)
        .then(({ data }) => {
          queryClient.setQueryData(['banktransactions'], (prev) => (prev ? [...prev, data] : [data]));
          setIsLoading(() => false);
          handleClose();
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    else
      axios
        .patch('/api/bank-accounts/transaction/' + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(['banktransactions'], (prev) =>
            prev.map((transaction) =>
              transaction.id === numericSelectedID ? { ...transaction, ...data } : transaction,
            ),
          );
          setIsLoading(() => false);
          handleClose();
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? 'UPDATE TRANSACTION' : 'ADD NEW TRANSACTION'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col gap-6 w-full">
              <Select
                name="BankName"
                label="Bank Account Name"
                options={banks}
                className="w-full rounded"
                register={register('BankName', {
                  required: 'Name is required!',
                  valueAsNumber: true,
                })}
                error={errors.BankName ? errors.BankName.message : ''}
              />
              {/* <Select
                name="Owner"
                label="Transaction Owner"
                defaultValue="Self"
                options={[
                  { value: "Self", label: "Self" },
                  { value: "Partner", label: "Partner" },
                  { value: "Joint", label: "Joint" },
                ]}
                className="w-full rounded"
                register={register("Owner", {
                  required: "Name is required!",
                })}
                error={errors.Owner ? errors.Owner.message : ""}
              /> */}
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a transaction description"
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
                  { value: 'Withdrawal', label: 'Pmt, Fee, Withdrawal (-)' },
                  { value: 'Credit', label: 'Deposit, Credit (+)' },
                ]}
                className="w-full rounded"
                register={register('Type', {
                  required: 'Type is required!',
                })}
                error={errors.Type ? errors.Type.message : ''}
              />
            </div>
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
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="Amount"
                label="Amount"
                className="w-full rounded"
                register={register('Amount', {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || 'Amount must be greater than zero',
                })}
                error={errors.Amount ? errors.Amount.message : ''}
              />
              <Select
                name="IsCleared"
                label="Cleared Bank?"
                defaultValue="No"
                options={[
                  { value: false, label: 'No' },
                  { value: true, label: 'Yes' },
                ]}
                className="w-full rounded"
                register={register('IsCleared', {
                  setValueAs: (value) => value === 'true',
                })}
                error={errors.IsCleared ? errors.IsCleared.message : ''}
              />
              <Select
                name="Taxable"
                label="Tax?"
                defaultValue="No"
                options={[
                  { value: false, label: 'No' },
                  { value: true, label: 'Yes' },
                ]}
                className="w-full rounded"
                register={register('Taxable', {
                  setValueAs: (value) => value === 'true',
                })}
                error={errors.Taxable ? errors.Taxable.message : ''}
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
                onClick={handleClose}
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

export default AddTransaction;
