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

export const AddBank = ({ open, setOpen, recordData }) => {
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
      setValue('Owner', recordData.Owner);
      setValue('Name', recordData.Name);
      setValue('OpeningBalance', recordData.OpeningBalance ? Number(recordData.OpeningBalance).toFixed(2) : '');
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (!recordData?.id)
      axios
        .post('/api/bank-accounts/name', data)
        .then(({ data }) => {
          queryClient.setQueryData(['accountnames'], (prev) => (prev ? [...prev, data] : [data]));
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    else
      axios
        .patch('/api/bank-accounts/name/' + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(['accountnames'], (prev) =>
            prev.map((bank) => (bank.id === numericSelectedID ? { ...bank, ...data } : bank)),
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
            {recordData ? 'UPDATE BANK ACCOUNT' : 'ADD NEW BANK ACCOUNT'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
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
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a Bank Account Name"
                type="text"
                name="Name"
                label="Bank Account Name"
                className="w-full rounded"
                register={register('Name', {
                  required: 'Name is required!',
                })}
                error={errors.Name ? errors.Name.message : ''}
              />
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="OpeningBalance"
                label="Opening Balance"
                className="w-full rounded"
                register={register('OpeningBalance', {
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
                })}
                error={errors.OpeningBalance ? errors.OpeningBalance.message : ''}
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

export default AddBank;
