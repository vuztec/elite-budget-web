import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { getCosts, getProjects, getResources } from "../../config/api";
import CustomSelect from "../CustomSelect";
import { dateFormatter } from "../../utils";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { getSuperCostPermission } from "../../utils/permissions";
import { getLimit } from "../../utils/PackageData";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddCost = ({ open, setOpen, recordData, chatUsers }) => {
  const queryClient = useQueryClient();
  const { user: currentUser, root } = useUserStore();
  const current_subcription = root?.subscriptions?.[0];

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: costData } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
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
        AssignedTo: recordData?.costdb_assignee?.map((assignee) => assignee.resource_id),
        CostDate: recordData?.CostDate ? dateFormatter(recordData?.CostDate) : "",
        PayDate: recordData?.PayDate ? dateFormatter(recordData?.PayDate) : "",
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

    if (!data.id) {
      // If 'id' is not present,
      axios
        .post(SERVER_URL + "/api/cost", data)
        .then(({ data }) => {
          const cost = data.items;
          queryClient.setQueryData(["costs"], (prev) => {
            const isTrue = prev?.find((item) => item.id === cost.id);

            if (!isTrue) return prev ? [cost, ...prev] : [cost];
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
        .put(SERVER_URL + "/api/cost/" + numericSelectedID, {
          cost: { ...data, AssignedTo, RemoveAssigns },
          chatUsers,
          is_stage_change: recordData.Stage !== data.Stage,
        })
        .then(({ data }) => {
          queryClient.setQueryData(["costs"], (prev) =>
            prev.map((cost) => (cost.id === numericSelectedID ? { ...cost, ...data.items } : cost))
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

  const [canAdd, setCanAdd] = useState(true);
  const handleProjectChange = (e) => {
    if (e && e.target?.value) {
      const eligible = getLimit(costData, e.target?.value, "Costs", current_subcription?.Package);
      setCanAdd(eligible);
      setValue("ProjectID", e.target.value);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE COST RECORD" : "ADD NEW COST RECORD"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Select
              onChange={handleProjectChange}
              placeholder="Select Project"
              name="ProjectID"
              label="Project Name"
              disabled={!getSuperCostPermission(currentUser, recordData, projectData)}
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
            <Textbox
              placeholder="Description"
              type="text"
              name="Description"
              label="Cost Description"
              disabled={!getSuperCostPermission(currentUser, recordData, projectData)}
              className="w-full rounded"
              register={register("Description", {
                required: "Description is required!",
              })}
              error={errors.Description ? errors.Description.message : ""}
            />
            <Controller
              name="AssignedTo"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={resources}
                  label="Assignees"
                  disabled={!getSuperCostPermission(currentUser, recordData, projectData)}
                />
              )}
            />
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Textbox
                  placeholder="Service Provider"
                  type="text"
                  name="ServiceProvider"
                  label="Service Provider"
                  className="w-full rounded"
                  register={register("ServiceProvider", {
                    //required: "Description is required!",
                  })}
                  error={errors.ServiceProvider ? errors.ServiceProvider.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox //can we make this an autocomplete instead with (Material, Labour, other) + map(cost.Category)
                  placeholder="Category"
                  type="text"
                  name="Category"
                  label="Cost Category"
                  className="w-full rounded"
                  register={register("Category", {
                    required: "Category is required!",
                  })}
                  error={errors.Category ? errors.Category.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Textbox // allow positive numbers and negative numbers
                  placeholder="0"
                  type="number"
                  name="CostAmount"
                  label="Cost Amount"
                  disabled={!getSuperCostPermission(currentUser, recordData, projectData)}
                  className="w-full rounded"
                  register={register("CostAmount", {
                    valueAsNumber: true,
                  })}
                  error={errors.CostAmount ? errors.CostAmount.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="CostDate"
                  label="Invoice Date"
                  className="w-full rounded"
                  register={register("CostDate", {
                    valueAsDate: true,
                  })}
                  error={errors.CostDate ? errors.CostDate.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="flex-1">
                <Select
                  placeholder="Select Status"
                  name="Stage"
                  label="Status"
                  options={[
                    { value: "Quote", label: "Quote" },
                    { value: "PO", label: "PO" },
                    { value: "Invoice", label: "Invoice" },
                    { value: "Paid", label: "Paid" },
                    { value: "Void", label: "Void" },
                  ]}
                  className="w-full rounded"
                  register={register("Stage", {
                    required: "Status is required!",
                  })}
                  error={errors.Status ? errors.Status.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="PayDate"
                  label="Paid On"
                  className="w-full rounded"
                  register={register("PayDate", {
                    valueAsDate: true,
                  })}
                  error={errors.PayDate ? errors.PayDate.message : ""}
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

export default AddCost;
