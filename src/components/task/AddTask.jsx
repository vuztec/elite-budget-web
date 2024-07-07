import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { getProjects, getResources, getTasks } from "../../config/api";
import CustomSelect from "../CustomSelect";
import { dateFormatter } from "../../utils";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import useUserStore from "../../app/user";
import { getSuperTaskPermission } from "../../utils/permissions";
import { getLimit } from "../../utils/PackageData";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddTask = ({ open, setOpen, recordData, socket, chatUsers }) => {
  const queryClient = useQueryClient();
  const { user: currentUser, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });

  const { data: taskData } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 60,
  });

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const resources = useMemo(() => {
    return resourceData?.map((resource) => ({
      value: resource.id,
      label: resource.FullName,
    }));
  }, [resourceData]);

  let defaultValues = recordData
    ? {
        ...recordData,
        AssignedTo: recordData?.taskdb_assignee?.map((assignee) => assignee.resource_id),
        StartDate: recordData?.StartDate ? dateFormatter(recordData?.StartDate) : "",
      }
    : {};

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const projectId = useWatch({ control, name: "ProjectID" });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    try {
      if (!data.id) {
        // If 'id' is not present,
        axios
          .post(SERVER_URL + "/api/task", data)
          .then(({ data }) => {
            const task = data.items;
            queryClient.setQueryData(["tasks"], (prev) => {
              const isTrue = prev?.find((item) => item.id === task.id);

              if (!isTrue) return prev ? [task, ...prev] : [task];
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
        // If 'id' is present
        delete data.id;
        delete data.projectdb;
        // delete data.taskdb_assignee;
        delete data._count;

        const AssignedTo = data.AssignedTo.filter((id) => !defaultValues.AssignedTo.includes(id));

        // Find removed IDs
        const RemoveAssigns = defaultValues.AssignedTo.filter((id) => !data.AssignedTo.includes(id));

        axios
          .put(SERVER_URL + "/api/task/" + numericSelectedID, {
            task: { ...data, AssignedTo, RemoveAssigns },
            chatUsers,
            is_stage_change: recordData.Stage !== data.Stage,
            is_due_date_change:
              new Date(data.StartDate).toISOString() !== new Date(recordData.StartDate).toISOString() ||
              data.TaskDuration !== Number(recordData.TaskDuration),
            is_priority_change: data.Priority !== recordData.Priority,
          })
          .then(({ data }) => {
            queryClient.setQueryData(["tasks"], (prev) =>
              prev.map((task) => (task.id === numericSelectedID ? { ...task, ...data.items } : task))
            );
            setIsLoading(() => false);
            setOpen(false);
          })
          .catch((err) => {
            setIsLoading(() => false);
            console.log(handleAxiosResponseError(err));
          });
      }
    } catch (error) {
      setIsLoading(() => true);

      console.error("Error:", error);
    }
  };

  const [canAdd, setCanAdd] = useState(true);
  const handleProjectChange = (e) => {
    if (e && e.target?.value) {
      const eligible = getLimit(taskData, e.target?.value, "Tasks", current_subcription?.Package);
      setCanAdd(eligible);
      setValue("ProjectID", e.target.value);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE TASK" : "ADD NEW TASK"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="w-full">
              <Select
                onChange={handleProjectChange}
                placeholder="Select Project"
                name="ProjectID"
                label="Project Name"
                disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                options={projectData?.map((project) => ({
                  value: Number(project.id),
                  label: project.Description,
                }))}
                className="w-full rounded"
                register={register("ProjectID", {
                  required: "Project is required!",
                  valueAsNumber: true,
                })}
                value={projectId}
                error={errors.ProjectID ? errors.ProjectID.message : ""}
              />
            </div>

            <div className="w-full">
              <Textbox
                placeholder="Enter Description"
                type="text"
                name="Description"
                label="Task Description"
                disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                className="w-full rounded"
                register={register("Description", {
                  required: "Description is required!",
                })}
                error={errors.Description ? errors.Description.message : ""}
              />
            </div>
            <div className="w-full">
              <Controller
                name="AssignedTo"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={resources}
                    label="Assignees"
                    disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-auto">
                <Select
                  placeholder="Select Stage"
                  name="Stage"
                  label="Stage"
                  options={[
                    { value: "To-Do", label: "To-Do" },
                    { value: "In-Progress", label: "In-Progress" },
                    { value: "Review", label: "Review" },
                    { value: "Completed", label: "Completed" },
                    { value: "On-Hold", label: "On-Hold" },
                    { value: "Cancelled", label: "Cancelled" },
                  ]}
                  className="w-full rounded"
                  register={register("Stage", {
                    required: "Stage is required!",
                  })}
                  error={errors.Stage ? errors.Stage.message : ""}
                />
              </div>
              <div className="flex-auto">
                <Select
                  placeholder="Select Priority"
                  name="Priority"
                  label="Priority"
                  disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                  options={[
                    { value: "Urgent", label: "Urgent" },
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                  ]}
                  className="w-full rounded"
                  register={register("Priority", {
                    required: "Priority is required!",
                  })}
                  error={errors.Priority ? errors.Priority.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="StartDate"
                  label="Start Date"
                  disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                  className="w-full rounded"
                  register={register("StartDate", {
                    valueAsDate: true,
                  })}
                  error={errors.StartDate ? errors.StartDate.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox // minimum value = 0
                  placeholder="0"
                  type="number"
                  name="TaskDuration"
                  label="Task Duration"
                  disabled={!getSuperTaskPermission(currentUser, recordData, projectData)}
                  className="w-full rounded"
                  register={register("TaskDuration", {
                    valueAsNumber: true,
                  })}
                  error={errors.TaskDuration ? errors.TaskDuration.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox // minimum value = 0 , maximum value = 100
                  placeholder="0"
                  type="number"
                  name="ActualComplete"
                  label="% Complete"
                  className="w-full rounded"
                  register={register("ActualComplete", {
                    valueAsNumber: true,
                  })}
                  error={errors.ActualComplete ? errors.ActualComplete.message : ""}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
              {canAdd && (
                <Button
                  type="submit"
                  className="w-fit flex flex-row-reverse items-center gap-1 text-white"
                  label="Submit"
                  icon={<IoMdSend />}
                />
              )}
              {!canAdd && <p className="text-red-500 font-bold">Limit Exceeded</p>}
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

export default AddTask;
