import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import CustomSelect from "../CustomSelect";
import { dateFormatter } from "../../utils";
import useUserStore from "../../app/user";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { getFinancialPermission } from "../../utils/permissions";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { daydues, paymentMethods } from "../../utils/budget.filter";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddDebt = ({ open, setOpen, recordData, chatUsers }) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const duedays = daydues.map((day) => ({
    value: day,
    label: day,
  }));

  const payMethods = paymentMethods.map((pay) => ({
    value: pay,
    label: pay,
  }));

  const hasFin = getFinancialPermission(user);

  const resources = [];

  let defaultValues = recordData ? {} : {};

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    if (!data.id) {
      axios
        .post(SERVER_URL + "/api/project", data)
        .then(({ data }) => {
          const project = data.items;
          queryClient.setQueryData(["projects"], (prev) => {
            const isTrue = prev?.find((proj) => proj.id === project.id);

            if (!isTrue) return prev ? [project, ...prev] : [project];
            else return prev;
          });
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    } else {
      delete data.id;
      delete data._count;
      const newManagers = data.project_managers.filter(
        (id) => !defaultValues.project_managers.includes(id)
      );

      // Find removed IDs
      const removedManagers = defaultValues.project_managers.filter(
        (id) => !data.project_managers.includes(id)
      );

      const newAdmins = data.project_admins.filter(
        (id) => !defaultValues.project_admins.includes(id)
      );

      // Find removed IDs
      const removedAdmin = defaultValues.project_admins.filter(
        (id) => !data.project_admins.includes(id)
      );

      const newStakeholders = data.project_stakeholders.filter(
        (id) => !defaultValues.project_stakeholders.includes(id)
      );

      // Find removed IDs
      const removeStakeholder = defaultValues.project_stakeholders.filter(
        (id) => !data.project_stakeholders.includes(id)
      );

      delete data.project_admins;
      delete data.project_managers;
      delete data.project_stakeholders;

      axios
        .put(SERVER_URL + "/api/project/" + numericSelectedID, {
          project: {
            ...data,
            newManagers,
            removedManagers,
            newAdmins,
            removedAdmin,
            newStakeholders,
            removeStakeholder,
          },
          chatUsers,
          is_stage_change: recordData.ProjectStage !== data.ProjectStage,
          is_due_date_change:
            new Date(recordData.EndDate).toISOString() !==
            new Date(data.EndDate).toISOString(),
        })
        .then(({ data }) => {
          queryClient.setQueryData(["projects"], (prev) =>
            prev.map((project) =>
              project.id === numericSelectedID
                ? { ...project, ...data.items }
                : project
            )
          );
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    }
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
            {recordData ? "UPDATE DEBT RECORD" : "ADD NEW DEBT RECORD"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder=""
                type="text"
                name="Description"
                label="Other Debt Description"
                disabled={true}
                className="w-full rounded"
                register={register("Description", {
                  required: "Description Source is required!",
                })}
                error={errors.Description ? errors.Description.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter a preferred name for this debt"
                type="text"
                name="NickName"
                label="Nickname"
                className="w-full rounded"
                register={register("NickName", {
                  //required: "NickName is required!",
                })}
                error={errors.NickName ? errors.NickName.message : ""}
              />
            </div>

            <div className="flex flex-col gap-6 w-full">
              <Select
                name="Owner"
                label="Name"
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
              <Select
                name="PaymentMethod"
                label="Payment Method"
                defaultValue="Auto Debit"
                options={payMethods}
                className="w-full rounded"
                register={register("PaymentMethod", {
                  //required: "Payment Method is required!",
                })}
                error={errors.PaymentMethod ? errors.PaymentMethod.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="LoanBalance"
                label="Loan Balance"
                className="w-full rounded"
                register={register("LoanBalance", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Amount must be positive or zero.",
                })}
                error={errors.LoanBalance ? errors.LoanBalance.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="MonthlyBudget"
                label="Monthly Budget"
                className="w-full rounded"
                register={register("MonthlyBudget", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Amount must be positive or zero.",
                })}
                error={errors.MonthlyBudget ? errors.MonthlyBudget.message : ""}
              />
              <Select
                name="DueDate"
                label="Day Due"
                defaultValue="N/A"
                options={duedays}
                className="w-full rounded"
                register={register("DueDate", {
                  //required: "Day Due is required!",
                })}
                error={errors.DueDate ? errors.DueDate.message : ""}
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
                className="w-fit flex flex-row-reverse items-center gap-1 text-white"
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

export default AddDebt;
