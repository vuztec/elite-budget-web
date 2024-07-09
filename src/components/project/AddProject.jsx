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

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddProject = ({ open, setOpen, recordData, chatUsers }) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
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
      const newManagers = data.project_managers.filter((id) => !defaultValues.project_managers.includes(id));

      // Find removed IDs
      const removedManagers = defaultValues.project_managers.filter((id) => !data.project_managers.includes(id));

      const newAdmins = data.project_admins.filter((id) => !defaultValues.project_admins.includes(id));

      // Find removed IDs
      const removedAdmin = defaultValues.project_admins.filter((id) => !data.project_admins.includes(id));

      const newStakeholders = data.project_stakeholders.filter((id) => !defaultValues.project_stakeholders.includes(id));

      // Find removed IDs
      const removeStakeholder = defaultValues.project_stakeholders.filter((id) => !data.project_stakeholders.includes(id));

      delete data.project_admins;
      delete data.project_managers;
      delete data.project_stakeholders;

      axios
        .put(SERVER_URL + "/api/project/" + numericSelectedID, {
          project: { ...data, newManagers, removedManagers, newAdmins, removedAdmin, newStakeholders, removeStakeholder },
          chatUsers,
          is_stage_change: recordData.ProjectStage !== data.ProjectStage,
          is_due_date_change: new Date(recordData.EndDate).toISOString() !== new Date(data.EndDate).toISOString(),
        })
        .then(({ data }) => {
          queryClient.setQueryData(["projects"], (prev) =>
            prev.map((project) => (project.id === numericSelectedID ? { ...project, ...data.items } : project))
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
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE PROJECT" : "ADD NEW PROJECT"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <Textbox
                placeholder="Enter Portfolio"
                type="text"
                name="Portfolio"
                label="Portfolio/Company"
                className="w-full rounded"
                register={register("Portfolio", {
                  //required: "Description is required!",
                })}
                error={errors.Portfolio ? errors.Portfolio.message : ""}
              />
              <Textbox
                placeholder="Enter Programme"
                type="text"
                name="Programme"
                label="Programme/Department"
                className="w-full rounded"
                register={register("Programme", {
                  //required: "Programme is required!",
                })}
                error={errors.Programme ? errors.Programme.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-2">
                <Textbox
                  placeholder="Enter Type"
                  type="text"
                  name="Type"
                  label="Type"
                  className="w-full rounded"
                  register={register("Type", {
                    //required: "Description is required!",
                  })}
                  error={errors.Type ? errors.Type.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Type Project Name"
                  type="text"
                  name="Description"
                  label="Project Name"
                  className="w-full rounded"
                  register={register("Description", {
                    required: "Description is required!",
                  })}
                  error={errors.Description ? errors.Description.message : ""}
                />
              </div>
            </div>
            <div className="w-full">
              <Controller
                name="project_managers"
                control={control}
                render={({ field }) => <CustomSelect {...field} options={resources} label="Project Manager" />}
              />
            </div>
            <div className="w-full">
              <Controller
                name="project_admins"
                control={control}
                render={({ field }) => <CustomSelect {...field} options={resources} label="Project Administrator" />}
              />
            </div>
            <div className="w-full">
              <Controller
                name="project_stakeholders"
                control={control}
                render={({ field }) => <CustomSelect {...field} options={resources} label="Project Stakeholders" />}
              />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Select
                  name="ProjectStage"
                  label="Stage"
                  defaultValue="Initiation"
                  options={[
                    { value: "Initiation", label: "Initiation" },
                    { value: "Planning", label: "Planning" },
                    { value: "Execution", label: "Execution" },
                    { value: "On-Going", label: "On-Going" },
                    { value: "Monitoring", label: "Monitoring" },
                    { value: "Closing", label: "Closing" },
                    { value: "On-Hold", label: "On-Hold" },
                    { value: "Cancelled", label: "Cancelled" },
                  ]}
                  className="w-full rounded"
                  register={register("ProjectStage", {
                    required: "Stage is required!",
                  })}
                  error={errors.ProjectStage ? errors.ProjectStage.message : ""}
                />
              </div>
              {hasFin && (
                <div className="flex-1">
                  <Textbox // minimum value = 0
                    placeholder="0"
                    type="number"
                    name="Budget"
                    label="Project Budget"
                    className="w-full rounded"
                    register={register("Budget", {
                      valueAsNumber: true,
                    })}
                    error={errors.Budget ? errors.Budget.message : ""}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <Textbox
                placeholder="Select Date"
                type="date"
                name="StartDate"
                label="Start Date"
                className="w-full rounded"
                register={register("StartDate", {
                  valueAsDate: true,
                })}
                error={errors.StartDate ? errors.StartDate.message : ""}
              />
              <Textbox
                placeholder="Select Date"
                type="date"
                name="EndDate"
                label="Due Date"
                className="w-full rounded"
                register={register("EndDate", {
                  valueAsDate: true,
                })}
                error={errors.EndDate ? errors.EndDate.message : ""}
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

export default AddProject;
