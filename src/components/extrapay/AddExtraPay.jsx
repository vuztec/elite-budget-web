import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Loading from '../Loader';
import Button from '../Button';
import { useQueryClient, useQuery } from 'react-query';
import { IoMdSend } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { formatDateForForm } from '../../utils';

export const AddExtraPay = ({ open, setOpen, recordData }) => {
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
      setValue('Date', formatDateForForm(new Date(recordData.Date ? recordData.Date : new Date())));
      setValue('SelfAmount', recordData.SelfAmount ?? '');
      setValue('PartnerAmount', recordData.PartnerAmount ?? '');
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    axios
      .patch('/api/extra-pay-checks/' + numericSelectedID, data)
      .then(({ data }) => {
        queryClient.setQueryData(['extrapaychecks'], (prev) =>
          prev.map((check) => (check.id === data.id ? data : check)),
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
            {recordData ? 'UPDATE EXTRA PAYCHECK' : 'ADD NEW EXTRA PAYCHECK'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Select Date"
                type="date"
                name="Date"
                label="Date"
                className="w-full rounded"
                register={register('Date', {
                  valueAsDate: true,
                })}
                error={errors.Date ? errors.Date.message : ''}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="SelfAmount"
                label="Self Amount"
                className="w-full rounded"
                register={register('SelfAmount', {
                  valueAsNumber: true,
                })}
                error={errors.SelfAmount ? errors.SelfAmount.message : ''}
              />
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="PartnerAmount"
                label="Partner Amount"
                className="w-full rounded"
                register={register('PartnerAmount', {
                  valueAsNumber: true,
                })}
                error={errors.PartnerAmount ? errors.PartnerAmount.message : ''}
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

export default AddExtraPay;
