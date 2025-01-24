import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Textbox2 from '../Textbox2';
import Select from '../Select';
import Loading from '../Loader';
import Button from '../Button';
import { useQueryClient } from 'react-query';
import { IoMdSend } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { formatDateForForm } from '../../utils';

export const AddExtraFund = ({ open, handleClose, recordData }) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('no');

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
      setSelected(recordData.IsDateKnown ? 'yes' : 'no');
    } else {
      setValue('Date', formatDateForForm(new Date()));
      setSelected('no');
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (selected === 'yes') data.IsDateKnown = true;
    else data.IsDateKnown = false;

    if (!recordData?.id)
      axios
        .post('/api/extra-funds-tracker', data)
        .then(({ data }) => {
          queryClient.setQueryData(['extrafunds'], (prev) => (prev ? [...prev, data] : [data]));
          setIsLoading(() => false);
          handleClose();
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
            {recordData ? 'UPDATE EXTRA FUND RECORD' : 'ADD NEW EXTRA FUND RECORD'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-auto">
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
                  required: 'Owner is required',
                })}
                error={errors.Owner ? errors.Owner.message : ''}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col w-full">
                <label className="text-slate-800 text-xs lg:text-sm text-nowrap">Date known?</label>
                <div className="flex gap-5 ml-1 mt-1">
                  <div className="flex gap-2">
                    <div>
                      <input
                        type="radio"
                        name="date-known"
                        value={'yes'}
                        checked={selected === 'yes'}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                    </div>
                    <label className="text-slate-800 text-xs lg:text-sm text-nowrap">Yes</label>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <input
                        type="radio"
                        name="date-known"
                        value={'no'}
                        checked={selected === 'no'}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                    </div>
                    <label className="text-slate-800 text-xs lg:text-sm text-nowrap">No</label>
                  </div>
                </div>
              </div>
              {selected === 'yes' ? (
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
              ) : (
                <Textbox2 type="text" label="Date" className="w-full rounded" disabled value="TBD" />
              )}

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

export default AddExtraFund;
