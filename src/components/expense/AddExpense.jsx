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
import { daydues, paymentMethods } from '../../utils/budget.filter';
import { showFields } from '../../utils/budget.calculation';

export const AddExpense = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();
  const isVisible = showFields(recordData);

  const duedays = daydues.map((day) => ({
    value: day,
    label: day,
  }));

  const payMethods = paymentMethods.map((pay) => ({
    value: pay,
    label: pay,
  }));

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
      setValue('Description', recordData.Description);
      setValue('NickName', recordData.NickName);
      setValue('Owner', recordData.Owner);
      setValue('PaymentMethod', recordData.PaymentMethod);
      setValue('MarketValue', recordData.MarketValue ?? '');
      setValue('LoanBalance', recordData.LoanBalance ?? '');
      setValue('MonthlyBudget', recordData.MonthlyBudget ?? '');
      setValue('DueDate', recordData.DueDate);
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    console.log(data);
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (!isVisible) {
      delete data.MarketValue;
      delete data.LoanBalance;
    }

    axios
      .patch('/api/expenses/' + numericSelectedID, data)
      .then(({ data }) => {
        queryClient.setQueryData(['expenses'], (prev) =>
          prev.map((expense) => (expense.id === numericSelectedID ? { ...expense, ...data } : expense)),
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
            {recordData ? 'UPDATE EXPENSE RECORD' : 'ADD NEW EXPENSE RECORD'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder=""
                type="text"
                name="Description"
                label="Expense Description"
                disabled={true}
                className="w-full rounded"
                register={register('Description')}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a preferred name for this expense"
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
                disabled={recordData?.Category === 'Joint Contribution'}
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
              <Select
                name="PaymentMethod"
                label="Payment Method"
                defaultValue="Auto Debit"
                options={payMethods}
                className="w-full rounded"
                register={register('PaymentMethod')}
                error={errors.PaymentMethod ? errors.PaymentMethod.message : ''}
              />
            </div>
            {isVisible && (
              <div className="flex flex-col gap-6 w-full">
                {recordData.Description !== 'Home Equity Line of Credit' && (
                  <Textbox
                    placeholder="Enter Amount"
                    type="number"
                    name="MarketValue"
                    label="Market Value"
                    className="w-full rounded"
                    register={register('MarketValue', {
                      valueAsNumber: true,
                      validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
                    })}
                    error={errors.MarketValue ? errors.MarketValue.message : ''}
                  />
                )}
                {recordData.Category !== 'Children' && (
                  <Textbox
                    placeholder="Enter Amount"
                    type="number"
                    name="LoanBalance"
                    label="Loan Balance"
                    className="w-full rounded"
                    register={register('LoanBalance', {
                      valueAsNumber: true,
                      validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
                    })}
                    error={errors.LoanBalance ? errors.LoanBalance.message : ''}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="MonthlyBudget"
                label="Monthly Budget"
                className="w-full rounded"
                register={register('MonthlyBudget', {
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
                })}
                error={errors.MonthlyBudget ? errors.MonthlyBudget.message : ''}
              />
              <Select
                name="DueDate"
                label="Day Due"
                defaultValue="N/A"
                options={duedays}
                className="w-full rounded"
                register={register('DueDate')}
                error={errors.DueDate ? errors.DueDate.message : ''}
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

export default AddExpense;
