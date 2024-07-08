// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import useUserStore from "../../app/user";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import Select from "../Select";
// import Loading from "../Loader";
// import Button from "../Button";
// import { useQueryClient } from "react-query";
// import { IoMdSend } from "react-icons/io";
// import { TiCancel } from "react-icons/ti";

// export const AddUser = ({ open, setOpen, recordData }) => {
//   const queryClient = useQueryClient();

//   let defaultValues = recordData ?? {};
//   const currentUser = useUserStore((state) => state.user);
//   const setUser = useUserStore((state) => state.setUser);

//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues })

//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(handleOnSubmit)} className="">
//           <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
//             {recordData ? "UPDATE PROFILE" : "ADD NEW USER"}
//           </Dialog.Title>
//           <div className="h-[90%] mt-2 flex flex-col gap-6 overflow-y-scroll bg-scroll">
//             <Textbox
//               placeholder="Full name"
//               type="text"
//               name="FullName"
//               label="Full Name"
//               className="w-full rounded"
//               register={register("FullName", {
//                 required: "Full name is required!",
//               })}
//               error={errors.name ? errors.name.message : ""}
//             />
//             <Textbox
//               placeholder="Designation"
//               type="text"
//               name="Designation"
//               label="Designation"
//               className="w-full rounded"
//               register={register("Designation", {
//                 required: "Designation is required!",
//               })}
//               error={errors.Designation ? errors.Designation.message : ""}
//             />
//             <Textbox
//               placeholder="Email Address"
//               type="email"
//               name="Email"
//               label="Email Address"
//               className="w-full rounded"
//               register={register("Email", {
//                 required: "Email Address is required!",
//               })}
//               error={errors.email ? errors.email.message : ""}
//             />
//             <Select
//               placeholder="Status"
//               name="Status"
//               label="Status"
//               options={[
//                 { value: "Active", label: "Active" },
//                 { value: "In-Active", label: "In-Active" },
//               ]}
//               className="w-full rounded"
//               register={register("Status", {
//                 required: "User role is required!",
//               })}
//               error={errors.Status ? errors.Status.message : ""}
//             />
//             <Select
//               placeholder="Type"
//               name="Type"
//               label="Type"
//               options={[
//                 { value: "Admin", label: "Admin" },
//                 { value: "User", label: "User" },
//               ]}
//               className="w-full rounded"
//               register={register("Type", {
//                 //required: "User Type is required!"
//               })}
//               error={errors.Status ? errors.Status.message : ""}
//             />
//           </div>

//           {isLoading ? (
//             <div className="py-5">
//               <Loading />
//             </div>
//           ) : (
//             <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
//               <Button
//                 type="submit"
//                 className="w-fit flex flex-row-reverse items-center gap-1 text-white"
//                 label="Submit"
//                 icon={<IoMdSend />}
//               />

//               <Button
//                 type="button"
//                 className="bg-pink-200 flex flex-row-reverse items-center gap-1 text-gray-900"
//                 onClick={() => setOpen(false)}
//                 label="Cancel"
//                 icon={<TiCancel />}
//               />
//             </div>
//           )}
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };

// export default AddUser;
