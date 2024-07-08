import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import { getResources } from "../../config/api";
import CustomSelect from "../CustomSelect";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AddStakeholder = ({ open, setOpen, recordData, itemID, type, stakeholders }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const allresources = useMemo(() => {
    return resourceData?.map((resource) => ({
      value: resource.id,
      label: resource.FullName,
    }));
  }, [resourceData]);

  const resources = useMemo(() => {
    return allresources?.filter((resource) => !stakeholders?.includes(resource.value));
  }, [allresources]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    setIsLoading(() => true);

    axios
      .post(SERVER_URL + "/api/general/stakeholder", { data, itemID })
      .then(({ data }) => {
        queryClient.setQueryData(["projects"], (prev) =>
          prev?.map((project) =>
            project.id === Number(itemID)
              ? {
                  ...project,
                  projectdb_stakeholder: [...project.projectdb_stakeholder, ...data.items],
                }
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
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE STAKEHOLDER" : "ADD NEW STAKEHOLDER"}
          </Dialog.Title>
          <div className="h-72 mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <Controller
              name="project_stakeholders"
              control={control}
              render={({ field }) => <CustomSelect {...field} options={resources} label="Stakeholders" />}
            />
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

export default AddStakeholder;
