import React, { useEffect, useState } from 'react';
import ModalWrapper from '../ModalWrapper';
import { Dialog } from '@headlessui/react';
import Loading from '../Loader';
import Button from '../Button';
import { useQueryClient } from 'react-query';
import { IoMdSend } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { getGoalToal } from '../../utils/budget.calculation';
import Textbox2 from '../Textbox2';

export const AddGoal = ({ open, setOpen, recordData, type, goals }) => {
  const queryClient = useQueryClient();
  const existingGoals = getGoalToal(goals);
  const [isLoading, setIsLoading] = useState(false);
  const [totalGoal, setTotalGoal] = useState(existingGoals);
  const [percentage, setPercentage] = useState(0);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (recordData?.id) {
      setPercentage(() => Number(recordData.Percentage));
      setTotalGoal(() => existingGoals);
      setCategory(() => recordData.Category);
    }

    return () => {
      setPercentage(0);
      setCategory('');
    };
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async () => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    let query = 'maingoals';

    if (type === 'Expense') query = 'expensegoals';
    if (type === 'Debt') query = 'debtgoals';

    axios
      .patch('/api/goals/' + numericSelectedID, { Percentage: Number(percentage) })
      .then(({ data }) => {
        queryClient.setQueryData([query], (prev) =>
          prev.map((goal) => (goal.id === numericSelectedID ? { ...goal, ...data } : goal)),
        );
        setIsLoading(() => false);
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(() => false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleGoalChange = (e) => {
    const value = Number(e.target?.value);

    if (value) setPercentage(() => value);
    else setPercentage(() => '');

    if (value && value + existingGoals - Number(recordData.Percentage) > 100) {
      setError('Amount must be between zero and 100.');
      setTotalGoal(() => existingGoals - Number(recordData.Percentage) + value);
    } else if (value && Number(recordData.Percentage) > 0) {
      setTotalGoal(() => existingGoals - Number(recordData.Percentage) + value);
      setError('');
    } else if (!value && Number(recordData.Percentage) > 0) {
      setTotalGoal(() => existingGoals - Number(recordData.Percentage));
      setError('');
    } else if (value && value + existingGoals >= 0 && value + existingGoals <= 100) {
      setTotalGoal(() => existingGoals + value);
      setError('');
    } else {
      setError('');
      setTotalGoal(existingGoals);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? 'UPDATE GOAL' : 'ADD NEW GOAL'}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox2
                type="text"
                name="Category"
                label="Category"
                className="w-full rounded"
                disabled={true}
                value={category}
              />

              <Textbox2
                placeholder="Enter Amount"
                type="number"
                label="Goal %"
                className="w-full rounded"
                value={percentage}
                onChange={handleGoalChange}
                error={error}
              />

              <Textbox2
                placeholder="0"
                type="number"
                label="All Goal %"
                disabled={true}
                className="w-full rounded"
                value={totalGoal}
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
                type="button"
                onClick={handleOnSubmit}
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
        </div>
      </ModalWrapper>
    </>
  );
};

export default AddGoal;
