import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient, useQuery } from "react-query";
import useUserStore from "../../app/user";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AddSplit = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

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
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    axios
      .put(SERVER_URL + "/api/project/" + numericSelectedID, data)
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
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full h-[70%]">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE CALC SPLIT" : "ADD NEW CALC SPLIT"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 w-full">
              <Textbox
                placeholder="Enter Amount"
                type="number"
                name="SelfAmount"
                label="Self % Split"
                className="w-full rounded"
                register={register("SelfAmount", {
                  valueAsNumber: true,
                  validate: (value) => (value >= 0 && value <= 100) || "Amount must between 0 - 100.",
                })}
                error={errors.SelfAmount ? errors.SelfAmount.message : ""}
              />
              <Textbox
                type="number"
                name="Goal"
                label="Partner % Split"
                disabled={true}
                className="w-full rounded"
                register={register("100 - SelfAmount", {
                  valueAsNumber: true,
                })}
                error={errors.Goal ? errors.Goal.message : ""}
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

export default AddSplit;
