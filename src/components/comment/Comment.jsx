import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useUserStore from "../../app/user";
import { BiCommentDetail } from "react-icons/bi";
import { getInitials, themeColors } from "../../utils";
import { useQueryClient } from "react-query";
import { timeSince } from "../../utils/date.format";
import moment from "moment";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import Loading from "../Loader";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Comments = ({ comments, type, itemID, query, isOneColumn = false, chatUsers }) => {
  const currentUser = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const msgRef = useRef();

  useEffect(() => {
    msgRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/comment", {
        comment: { Description: message, [type]: Number(itemID) },
        type,
        itemID,
        query,
        chatUsers,
      })
      .then(({ data }) => {
        setMessage(() => "");
        setIsLoading(false);
        const comment = data.items;
        queryClient.setQueryData(["comments", type, Number(itemID)], (prev) => {
          const isTrue = prev?.find((item) => item.id === comment.id);

          if (!isTrue) {
            queryClient.setQueryData([query], (prev) =>
              prev.map((item) =>
                item.id === Number(itemID)
                  ? {
                      ...item,
                      _count: {
                        ...item._count,
                        commentdb: item._count.commentdb + 1,
                      },
                    }
                  : item
              )
            );
            return prev ? [...prev, comment] : [comment];
          } else return prev;
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <div className="w-full bg-white">
      <div className={clsx("flex items-center gap-3 m-4", `text-[${themeColors[1]}]`)}>
        <div className="flex items-center gap-2">
          <BiCommentDetail className="text-xl" />
          <p className="font-semibold">MESSAGES</p>
        </div>
      </div>

      <div className=" bg-white mx-1 my-4 md:mx-4 px-2 ">
        <div className="w-full">
          <div className={`bg-white shadow-md rounded-lg w-full flex flex-col ${!isOneColumn && "7xl:flex-row"} `}>
            <div className="p-4 h-80 overflow-y-auto w-full flex flex-col">
              {comments?.map((comment, index) => {
                if (
                  (comment?.is_root && currentUser?.Type === "Root") ||
                  (comment?.user?.id === currentUser?.id && currentUser?.Type == "" && !comment.is_root)
                )
                  return (
                    <div className="mb-2 flex gap-2 items-center justify-end" key={index}>
                      <div>
                        <div className="flex justify-end">
                          <p className="bg-blue-400 text-white rounded-lg py-2 px-4 inline-block">{comment.Description}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {(comment.is_root ? comment?.rootuserdb?.FullName : comment?.user?.FullName) +
                            " - " +
                            timeSince(comment.CommentedOn)}
                        </p>
                      </div>
                      <div
                        className={clsx(
                          "min-w-6 min-h-6 max-w-6 max-h-6 rounded-full text-white flex items-center justify-center text-sm whitespace-nowrap",
                          `bg-[#20409A]`
                        )}
                      >
                        <span className="text-center text-xs">
                          {getInitials(comment.is_root ? comment?.rootuserdb?.FullName : comment?.user?.FullName)}
                        </span>
                      </div>
                    </div>
                  );
                else
                  return (
                    <div className="mb-2 flex gap-2 items-center" key={index}>
                      <div
                        className={clsx(
                          "min-w-6 min-h-6 max-w-6 max-h-6 rounded-full text-white flex items-center justify-center text-sm whitespace-nowrap",
                          `bg-[#20409A]`
                        )}
                      >
                        <span className="text-center text-xs">
                          {getInitials(comment.is_root ? comment?.rootuserdb?.FullName : comment?.user?.FullName)}
                        </span>
                      </div>
                      <div>
                        <div className="flex">
                          <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{comment.Description}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {(comment.is_root ? comment?.rootuserdb?.FullName : comment?.user?.FullName) +
                            " - " +
                            moment(comment.CommentedOn).fromNow()}
                        </p>
                      </div>
                    </div>
                  );
              })}
              <div ref={msgRef} />
            </div>
            <div className="p-4 border-t flex flex-col 2xl:flex-row h-min w-full">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                //type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-t-md rounded-b-none 2xl:rounded-l-md 2xl:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleOnSubmit}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-b-md rounded-t-none 2xl:rounded-r-md 2xl:rounded-l-none hover:bg-blue-600 transition duration-300"
              >
                {isLoading ? <Loading /> : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
