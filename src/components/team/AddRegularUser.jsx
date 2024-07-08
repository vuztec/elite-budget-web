import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../app/user";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Select from "../Select";
import Loading from "../Loader";
import Button from "../Button";
import { useQueryClient } from "react-query";
import { IoMdSend } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { dateFormatter } from "../../utils";
import { getAdminUserPermission } from "../../utils/permissions";

export const AddRegularUser = ({ open, setOpen, recordData }) => {
  const queryClient = useQueryClient();

  let defaultValues = recordData
    ? {
        ...recordData,
        DateOfBirth: recordData?.DateOfBirth ? dateFormatter(recordData?.DateOfBirth) : "",
      }
    : {
        hasAdd: false,
        hasDel: false,
        hasEdit: false,
        hasFin: false,
        isAdmin: false,
        Status: "Active",
      };

  const currentUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Define handleOnSubmit function to handle form submission
  const handleOnSubmit = async (data) => {
    const numericSelectedID = parseInt(data.id);
    setIsLoading(() => true);

    try {
      if (!data.id) {
        // If 'id' is not present, it's a new resource, so we add 'RootID' and use POST method
        data.RootID = currentUser.RootID;
        data.Password = currentUser.Email;
      } else {
        // If 'id' is present, it's an update, so we remove 'RootID' and 'id' and use PUT method
        delete data.RootID;
        delete data.id;
        delete data.Password;
      }
    } catch (error) {
      setIsLoading(() => false);

      console.error("Error:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
            {recordData ? "UPDATE USER PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <Textbox
                placeholder="Enter Full name"
                type="text"
                name="FullName"
                label="Full Name"
                className="w-full rounded"
                register={register("FullName", {
                  required: "Full name is required!",
                })}
                error={errors.FullName ? errors.FullName.message : ""}
              />
              <Textbox
                placeholder="Enter Designation"
                type="text"
                name="Designation"
                label="Designation"
                className="w-full rounded"
                register={register("Designation", {
                  required: "Designation is required!",
                })}
                error={errors.Designation ? errors.Designation.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="w-full sm:w-2/3">
                <Textbox
                  placeholder="Enter Email Address"
                  type="email"
                  name="Email"
                  label="Email Address"
                  className="w-full rounded"
                  register={register("Email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.Email ? errors.Email.message : ""}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <Textbox
                  placeholder="Enter Telephone"
                  type="text"
                  name="Telephone"
                  label="Telephone"
                  className="w-full rounded"
                  register={register("Telephone", {
                    required: "Telephone is required!",
                  })}
                  error={errors.Telephone ? errors.Telephone.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="w-full sm:w-1/3">
                <Textbox
                  placeholder="Select Date"
                  type="date"
                  name="DateOfBirth"
                  label="Date of Birth"
                  className="w-full rounded"
                  register={register("DateOfBirth", {
                    valueAsDate: true,
                  })}
                  error={errors.DateOfBirth ? errors.DateOfBirth.message : ""}
                />
              </div>
              <div className="w-full sm:w-2/3">
                <Textbox
                  placeholder="Enter Company"
                  type="text"
                  name="Company"
                  label="Company"
                  className="w-full rounded"
                  register={register("Company", {
                    //required: "Company is required!",
                  })}
                  //error={errors.Company ? errors.Company.message : ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <Textbox
                placeholder="Enter Department"
                type="text"
                name="Department"
                label="Department"
                className="w-full rounded"
                register={register("Department", {
                  //required: "Department is required!",
                })}
                error={errors.Department ? errors.Department.message : ""}
              />
              <Textbox
                placeholder="Enter Manager"
                type="text"
                name="Manager"
                label="Manager"
                className="w-full rounded"
                register={register("Manager", {
                  //required: "Manager is required!",
                })}
                //error={errors.Manager ? errors.Manager.message : ""}
              />
            </div>
            <div className="flex flex-col gap-6 sm:flex-row w-full">
              <div className="w-full sm:w-2/3">
                <Textbox
                  placeholder="Enter Manager Email"
                  type="email"
                  name="ManagerEmail"
                  label="Manager Email"
                  className="w-full rounded"
                  register={register("ManagerEmail", {
                    //required: "Manager Email is required!",
                  })}
                  //error={errors.ManagerEmail ? errors.ManagerEmail.message : ""}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <Textbox
                  placeholder="Enter Manager Telephone"
                  type="text"
                  name="ManagerTel"
                  label="Manager Telephone"
                  className="w-full rounded"
                  register={register("ManagerTel", {
                    //required: "Telephone is required!",
                  })}
                  //error={errors.ManagerTel ? errors.ManagerTel.message : ""}
                />
              </div>
            </div>
            <>
              {getAdminUserPermission(currentUser, recordData) && (
                <>
                  <div className="flex flex-col gap-6 sm:flex-row w-full">
                    <Textbox // minimum value = 0
                      placeholder="0"
                      type="number"
                      name="HrRate"
                      label="Hourly Rate"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      className="w-full rounded"
                      register={register("HrRate", {
                        valueAsNumber: true,
                      })}
                    />
                    <Select
                      placeholder="Status"
                      name="Status"
                      label="Status"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "In-Active", label: "In-Active" },
                      ]}
                      className="w-full rounded"
                      register={register("Status", {
                        required: "User role is required!",
                      })}
                      error={errors.Status ? errors.Status.message : ""}
                    />
                    <Select
                      placeholder="Select"
                      name="isAdmin"
                      label="Is Admin?"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="w-full rounded"
                      register={register("isAdmin", {
                        setValueAs: (value) => value === "true",
                      })}
                    />
                    <Select
                      placeholder="Select"
                      name="hasFin"
                      label="Financial Access?"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="w-full rounded"
                      register={register("hasFin", {
                        setValueAs: (value) => value === "true",
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-6 sm:flex-row w-full">
                    <Select
                      placeholder="Select"
                      name="hasAdd"
                      label="Can Add?"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="w-full rounded"
                      register={register("hasAdd", {
                        setValueAs: (value) => value === "true",
                      })}
                    />
                    <Select
                      placeholder="Select"
                      name="hasEdit"
                      label="Can Edit?"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="w-full rounded"
                      register={register("hasEdit", {
                        setValueAs: (value) => value === "true",
                      })}
                    />
                    <Select
                      placeholder="Select"
                      name="hasDel"
                      label="Can Delete?"
                      disabled={!getAdminUserPermission(currentUser, recordData)}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="w-full rounded"
                      register={register("hasDel", {
                        setValueAs: (value) => value === "true",
                      })}
                    />
                  </div>
                </>
              )}
            </>
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

export default AddRegularUser;
