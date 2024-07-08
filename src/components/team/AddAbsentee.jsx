import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { dateFormatter } from "../../utils";
import { getResources } from "../../config/api";
import Select from "../Select";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddAbsentee = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();
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
        Requester: recordData.resourcesdb?.id,
        StartDate: recordData?.StartDate ? dateFormatter(recordData?.StartDate) : "",
        EndDate: recordData?.EndDate ? dateFormatter(recordData?.EndDate) : "",
      }
    : {};

  const currentUser = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    console.log(data);
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    if (!data.id) {
      // If 'id' is not present,
      axios
        .post(SERVER_URL + "/api/absentee", data)
        .then(({ data }) => {
          queryClient.setQueryData(["absentees"], (prev) => (prev ? [data.items, ...prev] : [data.items]));
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
      delete data._count;
      delete data.resourcesdb;

      axios
        .put(SERVER_URL + "/api/absentee/" + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(["absentees"], (prev) =>
            prev.map((absentee) => (absentee.id === numericSelectedID ? { ...absentee, ...data.items } : absentee))
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
            {recordData ? "UPDATE ABSENTEE RECORD" : "ADD NEW ABSENTEE RECORD"}
          </Dialog.Title>
          <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Select
              placeholder="Select Resource"
              name="Requester" // WEE NEED TO ADD A ResourceID column (1-to-1) to resourcesdb.id
              label="Full Name"
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
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="StartDate"
                  label="Start Date"
                  className="w-full rounded"
                  register={register("StartDate", {
                    valueAsDate: true,
                    required: "start date is required!",
                  })}
                  error={errors.name ? errors.name.message : ""}
                />
              </div>
              <div className="flex-1">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="EndDate"
                  label="Last Date"
                  className="w-full rounded"
                  register={register("EndDate", {
                    valueAsDate: true,
                    required: "Due date is required!",
                  })}
                  error={errors.name ? errors.name.message : ""}
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

export default AddAbsentee;
