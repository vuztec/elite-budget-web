import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

export const AddSplit = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  let defaultValues = recordData ? {} : {};

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const self = useWatch({ control, name: "SelfAmount" });

  useEffect(() => {
    if (self) setValue("PartnerAmount", 100 - self);
    else setValue("PartnerAmount", 100);
  }, [self]);

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = Number(recordData.id);
    setIsLoading(() => true);

    if (!recordData?.id)
      axios
        .post("/api/joint-split/" + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(["jointsplits"], (prev) =>
            prev.map((item) =>
              item.id === numericSelectedID ? { ...item, ...data } : item
            )
          );
          setIsLoading(() => false);
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(() => false);
          console.log(handleAxiosResponseError(err));
        });
    else
      axios
        .patch("/api/joint-split/" + numericSelectedID, data)
        .then(({ data }) => {
          queryClient.setQueryData(["jointsplits"], (prev) =>
            prev.map((item) =>
              item.id === numericSelectedID ? { ...item, ...data } : item
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
                  validate: (value) =>
                    (value >= 0 && value <= 100) ||
                    "Amount must between 0 - 100.",
                })}
                error={errors.SelfAmount ? errors.SelfAmount.message : ""}
              />
              <Textbox
                type="number"
                name="PartnerAmount"
                label="Partner % Split"
                disabled={true}
                className="w-full rounded"
                register={register("PartnerAmount")}
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

export default AddSplit;
