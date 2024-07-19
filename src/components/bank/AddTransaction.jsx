import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { getBankAccountNames } from "../../config/api";

export const AddTransaction = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  const { data: accountnames, status: isNamesLoaded } = useQuery({
    queryKey: ["accountnames"],
    queryFn: getBankAccountNames,
    staleTime: 1000 * 60 * 60,
  });

  const bankAccountNames = accountnames.map((account) => ({
    value: account.id,
    label: account.Name,
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
      setValue("BankName", recordData.BankAccountName.id);
      setValue("Owner", recordData.Owner);
      setValue("Description", recordData.Description);
      setValue("Type", recordData.Type);
      setValue("Amount", recordData.Amount);
      setValue("IsCleared", recordData.IsCleared);
    }

    return () => reset();
  }, [recordData]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (!recordData?.id)
      axios
        .post("/api/bank-accounts/transaction", data)
        .then(({ data }) => {
          queryClient.setQueryData(["banktransactions"], (prev) => (prev ? [...prev, data] : [data]));
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    else
      axios
        .patch("/api/bank-accounts/transaction/" + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(["banktransactions"], (prev) =>
            prev.map((transaction) => (transaction.id === numericSelectedID ? { ...transaction, ...data } : transaction))
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
            {recordData ? "UPDATE TRANSACTION" : "ADD NEW TRANSACTION"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Select
                name="BankName"
                label="Bank Account Name"
                options={bankAccountNames}
                className="w-full rounded"
                register={register("BankName", {
                  required: "Name is required!",
                  valueAsNumber: true,
                })}
                error={errors.BankName ? errors.BankName.message : ""}
              />
              <Select
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
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a transaction description"
                type="text"
                name="Description"
                label="Description"
                className="w-full rounded"
                register={register("Description", {
                  required: "Description is required!",
                })}
                error={errors.Description ? errors.Description.message : ""}
              />
            </div>

            <div className="flex flex-col gap-6 w-full">
              <Select
                name="Type"
                label="Type"
                defaultValue="Credit"
                options={[
                  { value: "Withdrawal", label: "Pmt, Fee, Withdrawal (-)" },
                  { value: "Credit", label: "Deposit, Credit (+)" },
                ]}
                className="w-full rounded"
                register={register("Type", {
                  required: "Type is required!",
                })}
                error={errors.Type ? errors.Type.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="Amount"
                label="Amount"
                className="w-full rounded"
                register={register("Amount", {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || "Amount must be greater than zero or positive",
                })}
                error={errors.Amount ? errors.Amount.message : ""}
              />
              <Select
                name="IsCleared"
                label="Is Cleared?"
                defaultValue="Yes"
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                className="w-full rounded"
                register={register("IsCleared", {
                  setValueAs: (value) => value === "true",
                })}
                error={errors.IsCleared ? errors.IsCleared.message : ""}
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
                label="Submit"
                icon={<IoMdSend />}
              />

              <Button
                type="button"
                className="bg-pink-200 flex flex-row-reverse items-center gap-1 text-gray-900"
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

export default AddTransaction;