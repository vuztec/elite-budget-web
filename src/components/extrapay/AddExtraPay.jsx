import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox';
import Textbox2 from '../Textbox2';
import Loading from '../Loader';
import Button from '../Button';
import { useQueryClient } from 'react-query';
import { IoMdSend } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { formatDateForForm } from '../../utils';

export const AddExtraPay = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState('no');

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
      setValue(
        'Date',
        formatDateForForm(new Date(recordData.Date ? recordData.Date?.split('T')[0] + 'T00:00:00' : new Date())),
      );
      setValue('SelfAmount', recordData.SelfAmount ? Number(recordData.SelfAmount).toFixed(2) : '');
      setValue('PartnerAmount', recordData.PartnerAmount ? Number(recordData.PartnerAmount).toFixed(2) : '');
      setSelected(recordData.IsDateKnown ? 'yes' : 'no');
    } else {
      setValue('Date', formatDateForForm(new Date()));
      setSelected('no');
      setValue('SelfAmount', Number(0));
      setValue('PartnerAmount', Number(0));
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (selected === 'yes') data.IsDateKnown = true;
    else data.IsDateKnown = false;

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
          <div className="mt-2 flex flex-col gap-6 overflow-y-auto">
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
                })}
                error={errors.Date ? errors.Date.message : ''}
              />
            ) : (
              <Textbox2 type="text" label="Date" className="w-full rounded" disabled value="TBD" />
            )}

            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="0.00"
                type="number"
                name="SelfAmount"
                label="Self Amount"
                className="w-full rounded"
                register={register('SelfAmount', {
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
                })}
                error={errors.SelfAmount ? errors.SelfAmount.message : ''}
              />
              <Textbox
                placeholder="0.00"
                type="number"
                name="PartnerAmount"
                label="Partner Amount"
                className="w-full rounded"
                register={register('PartnerAmount', {
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || 'Amount must be greater than or equal to zero',
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
