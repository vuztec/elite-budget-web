import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { dateFormatter } from "../../utils";
import { getProjects, getResources } from "../../config/api";
import CustomSelect from "../CustomSelect";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddTimesheet = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
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
        Approvers: recordData?.timesheetdb_approver?.map((assignee) => assignee.resource_id),
        RecDate: recordData?.RecDate ? dateFormatter(recordData?.RecDate) : "",
        ApprovedDate: recordData?.ApprovedDate ? dateFormatter(recordData?.ApprovedDate) : "",
      }
    : {};

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
      // If 'id' is not present,
      axios
        .post(SERVER_URL + "/api/timesheet", data)
        .then(({ data }) => {
          queryClient.setQueryData(["timesheets"], (prev) => (prev ? [data.items, ...prev] : [data.items]));
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
      delete data.projectdb;
      delete data.resourcesdb;

      const Approvers = data.Approvers.filter((id) => !defaultValues.Approvers.includes(id));

      // Find removed IDs
      const RemoveApprovers = defaultValues.Approvers.filter((id) => !data.Approvers.includes(id));

      axios
        .put(SERVER_URL + "/api/timesheet/" + numericSelectedID, { ...data, Approvers, RemoveApprovers })
        .then(({ data }) => {
          queryClient.setQueryData(["timesheets"], (prev) =>
            prev.map((timesheet) => (timesheet.id === numericSelectedID ? { ...timesheet, ...data.items } : timesheet))
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
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE TIMESHEET RECORD" : "ADD NEW TIMESHEET RECORD"}
          </Dialog.Title>
          <div className="h-[600px] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Select
              placeholder="Select Project"
              name="ProjectID"
              label="Project Name"
              options={projectData?.map((project) => ({
                value: Number(project.id),
                label: project.Description,
              }))}
              className="w-full rounded"
              register={register("ProjectID", {
                required: "Project is required!",
                valueAsNumber: true,
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Select
              placeholder="Select Resource"
              name="Requester" // WEE NEED TO ADD A ResourceID column (1-to-1) to resourcesdb.id
              label="Requester"
              options={resources}
              className="w-full rounded"
              register={register("Requester", {
                required: "Resource is required!",
                valueAsNumber: true,
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Description"
              type="text"
              name="Description"
              label="Description"
              className="w-full rounded"
              register={register("Description", {
                required: "Description is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Textbox // minimum value = 0
                  placeholder="0"
                  type="number"
                  name="Hours"
                  label="Booked Hours"
                  className="w-full rounded"
                  register={register("Hours", {
                    valueAsNumber: true,
                  })}
                  error={errors.name ? errors.name.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="RecDate"
                  label="Record Date"
                  className="w-full rounded"
                  register={register("RecDate", {
                    valueAsDate: true,
                    required: "record date is required!",
                  })}
                  error={errors.name ? errors.name.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Controller
                  name="Approvers"
                  control={control}
                  render={({ field }) => <CustomSelect {...field} options={resources} label="Approver" />}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="ApprovedDate"
                  label="Approved On"
                  className="w-full rounded"
                  register={register("ApprovedDate", {
                    valueAsDate: true,
                    required: "Due date is required!",
                  })}
                  error={errors.ApprovedDate ? errors.ApprovedDate.message : ""}
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

export default AddTimesheet;
