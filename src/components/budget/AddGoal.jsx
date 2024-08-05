import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

export const AddGoal = ({ open, setOpen, recordData, type }) => {
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
      setValue("Percentage", recordData.Goal);
      setValue("Category", recordData.Category);
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    let query = "maingoals";

    if (type === "Expense") query = "expensegoals";
    if (type === "Debt") query = "debtgoals";

    axios
      .patch("/api/goals/" + numericSelectedID, data)
      .then(({ data }) => {
        queryClient.setQueryData([query], (prev) =>
          prev.map((goal) =>
            goal.id === numericSelectedID ? { ...goal, ...data } : goal
          )
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
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full h-[70%]"
        >
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {recordData ? "UPDATE GOAL" : "ADD NEW GOAL"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                type="text"
                name="Category"
                label="Category"
                className="w-full rounded"
                disabled={true}
                register={register("Category")}
                error={errors.Category ? errors.Category.message : ""}
              />
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="Percentage"
                label="Goal %"
                className="w-full rounded"
                register={register("Percentage", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Amount must be positive or zero.",
                })}
                error={errors.Percentage ? errors.Percentage.message : ""}
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

export default AddGoal;
