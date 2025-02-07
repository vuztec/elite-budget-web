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

export const AddIncome = ({ open, setOpen, recordData }) => {
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
      setValue('IncomeSource', recordData.IncomeSource);
      setValue('NickName', recordData.NickName);
      setValue('Owner', recordData.Owner);
      setValue('Frequency', recordData.Frequency);
      setValue('GrossAmount', recordData.GrossAmount ? Number(recordData?.GrossAmount).toFixed(2) : '');
      setValue('NetAmount', recordData.NetAmount ? Number(recordData?.NetAmount).toFixed(2) : '');
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData?.id);
    setIsLoading(() => true);

    axios
      .patch('/api/income/' + numericSelectedID, data)
      .then(({ data }) => {
        queryClient.setQueryData(['incomes'], (prev) =>
          prev.map((income) => (income.id === numericSelectedID ? { ...income, ...data } : income)),
        );
        setIsLoading(() => false);
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(() => false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? 'UPDATE INCOME RECORD' : 'ADD NEW INCOME RECORD'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder=""
                type="text"
                name="IncomeSource"
                label="Income Source"
                disabled={true}
                className="w-full rounded"
                register={register('IncomeSource')}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a preferred name for income source"
                type="text"
                name="NickName"
                label="Nickname"
                className="w-full rounded"
                register={register('NickName')}
                error={errors.NickName ? errors.NickName.message : ''}
              />
            </div>

            <div className="flex flex-col gap-6 w-full">
              <Select
                name="Owner"
                label="Owner"
                defaultValue="Self"
                options={[
                  { value: 'Self', label: 'Self' },
                  { value: 'Partner', label: 'Partner' },
                  { value: 'Joint', label: 'Joint' },
                ]}
                className="w-full rounded"
                register={register('Owner', {
                  required: 'Owner is required',
                })}
                error={errors.Owner ? errors.Owner.message : ''}
              />
              <Select
                name="Frequency"
                label="Frequency"
                defaultValue="Monthly"
                options={[
                  { value: 'Weekly', label: 'Weekly: Paid Weekly' },
                  { value: 'Bi-Weekly', label: 'Bi-Weekly: Paid Every 2 Weeks' },
                  { value: 'Semi-Monthly', label: 'Semi-Monthly: Paid on 15th & last day' },
                  { value: 'Monthly', label: 'Monthly: Paid 1x per month' },
                  { value: 'Yearly', label: 'Yearly: Paid 1x per year' },
                ]}
                className="w-full rounded"
                register={register('Frequency', {
                  required: 'Frequency is required!',
                })}
                error={errors.Frequency ? errors.Frequency.message : ''}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="GrossAmount"
                label="Gross Amount"
                className="w-full rounded"
                register={register('GrossAmount', {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || 'Amount must be greater than zero',
                })}
                error={errors.GrossAmount ? errors.GrossAmount.message : ''}
              />
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="NetAmount"
                label="Net Amount"
                className="w-full rounded"
                register={register('NetAmount', {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || 'Amount must be greater than zero',
                })}
                error={errors.NetAmount ? errors.NetAmount.message : ''}
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

export default AddIncome;
