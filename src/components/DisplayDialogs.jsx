import clsx from "clsx";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import { SubTasks } from "./subtask/SubTasks";
import { getAttachments, getComments, getSubTasks } from "../config/api";
import { useQuery, useQueryClient } from "react-query";
import { Attachments } from "./attachment/Attachments";
import { Comments } from "./comment/Comment";
import { IoMdClose } from "react-icons/io";
import { themeColors } from "../utils";
import { useEffect } from "react";

export default function SubTasksDialog({
  open,
  setOpen,
  recordData,
  type,
  query,
  hasAdd,
  hasEdit,
  hasDel,
  chatUsers,
}) {
  const description = recordData?.Description;
  const id = recordData?.id;
  const { data: subtasks } = useQuery({
    queryKey: ["subtasks", type, parseInt(id)],
    queryFn: () => getSubTasks(type, id),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p
            className={clsx(
              "w-full font-bold items-left px-3 py-2 rounded-md text-white",
              `bg-[${themeColors[0]}]`
            )}
          >
            {description}
          </p>

          <div className="w-full items-left">
            <SubTasks
              subtasks={subtasks}
              type={type}
              itemID={parseInt(id)}
              query={query}
              hasAdd={hasAdd}
              hasEdit={hasEdit}
              hasDel={hasDel}
              chatUsers={chatUsers}
            />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => setOpen(false)}
              label="Close"
              icon={<IoMdClose />}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function AttachmentsDialog({
  open,
  setOpen,
  recordData,
  type,
  query,
  hasAdd,
  hasEdit,
  hasDel,
  chatUsers,
}) {
  const id = recordData?.id;
  const description = recordData?.Description;
  const { data: attachments } = useQuery({
    queryKey: ["attachments", type, parseInt(id)],
    queryFn: () => getAttachments(type, id),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p
            className={clsx(
              "w-full font-bold items-left px-3 py-2 rounded-md text-white",
              `bg-[${themeColors[0]}]`
            )}
          >
            {description}
          </p>

          <div className="w-full items-left">
            <Attachments
              attachments={attachments}
              type={type}
              itemID={parseInt(id)}
              query={query}
              hasAdd={hasAdd}
              hasEdit={hasEdit}
              hasDel={hasDel}
              chatUsers={chatUsers}
            />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => setOpen(false)}
              label="Close"
              icon={<IoMdClose />}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function CommentsDialog({
  open,
  setOpen,
  recordData,
  type,
  query,
  hasAdd,
  hasEdit,
  hasDel,
  chatUsers,
}) {
  const description = recordData?.Description;
  const id = recordData?.id;
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ["comments", type, parseInt(id)],
    queryFn: () => getComments(type, id),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    // Fetch comments when the component mounts
    if (id && type)
      queryClient.prefetchQuery(["comments", type, id], () =>
        getComments(type, id)
      );
  }, [type, id]);

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="mb-2.5 ml-0 mr-0 mt-0 w-full flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
          <p
            className={clsx(
              "w-full font-bold items-left px-3 py-2 rounded-md text-white",
              `bg-[${themeColors[0]}]`
            )}
          >
            {description}
          </p>

          <div className="w-full items-left">
            <Comments
              comments={comments}
              type={type}
              itemID={parseInt(id)}
              query={query}
              isOneColumn={true}
              hasAdd={hasAdd}
              hasEdit={hasEdit}
              hasDel={hasDel}
              chatUsers={chatUsers}
            />
          </div>

          <div className="mb-3">
            <Button
              type="button"
              className="bg-pink-200 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => setOpen(false)}
              label="Close"
              icon={<IoMdClose />}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
