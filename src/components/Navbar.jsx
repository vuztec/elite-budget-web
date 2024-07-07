import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserAvatar from "./team/UserAvatar";
import NotificationPanel from "./NotificationPanel";
import useUserStore from "../app/user";
import { useLocation } from "react-router-dom";
import { SidebarLinks } from "../utils/sidebar.data";
import socket from "../utils/socket";
import { useQueryClient, useQuery } from "react-query";
import { getNotifications } from "../config/api";
import axios from "../config/axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {
  const { setSidebar, user, updateRoot, setUser, isRefresh, setIsRefresh } = useUserStore();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (isRefresh) {
      setIsRefresh(false);
      window.location.reload();
    }
  }, [isRefresh]);

  useEffect(() => {
    axios
      .get(SERVER_URL + "/api/auth/me")
      .then(({ data }) => {
        setUser(data.resource, data.root);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  useEffect(() => {
    const data = SidebarLinks.find((item) =>
      item.link ? item.link === location.pathname : item.sub.find((sub_item) => sub_item.link === location.pathname)
    );

    if (data?.sub?.length) {
      const sub = data?.sub[parseInt(tab)];
      setTitle(data?.label + " - " + sub?.label);
    } else setTitle(data?.label);
  }, [location.pathname, tab]);

  useEffect(() => {
    if (user) {
      socket?.emit("join-root-server", user.RootID.toString(), (ackMessage) => {
        console.log("Acknowledgment received:", ackMessage);
      });

      socket?.emit("set-online-user");
    }
    return () => {
      socket?.emit("disconnected", new Date());
    };
  }, [user]);

  useEffect(() => {
    /* --------- ================ Projects ==================== -------------- */
    if (!user) return;
    socket?.on("projectAdded", (project) => {
      queryClient.setQueryData(["projects"], (prev) => {
        const isTrue = prev?.find((proj) => proj.id === project.id);

        if (!isTrue) return prev ? [project, ...prev] : [project];
        else return prev;
      });
    });

    socket?.on("projectUpdated", (updatedProject, id) => {
      console.log("updated project :", updatedProject);

      queryClient.setQueryData(["projects"], (prev) =>
        prev.map((project) => (project.id === id ? { ...project, ...updatedProject } : project))
      );
    });

    socket?.on("projectDeleted", (projectId) => {
      queryClient.setQueryData(["projects"], (prev) => prev.filter((project) => project.id !== projectId));
    });

    /* ------------ ============== Tasks ==================== --------------- */
    socket?.on("taskAdded", (task) => {
      queryClient.setQueryData(["tasks"], (prev) => {
        const isTrue = prev?.find((item) => item.id === task.id);

        if (!isTrue) return prev ? [task, ...prev] : [task];
        else return prev;
      });
    });

    socket?.on("taskUpdated", (updatedTask, id) => {
      queryClient.setQueryData(["tasks"], (prev) => prev?.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    });

    socket?.on("taskDeleted", (taskId) => {
      queryClient.setQueryData(["tasks"], (prev) => prev.filter((task) => task.id !== taskId));
    });

    /* ----------====================== Costs ================== ---------------- */

    socket?.on("costAdded", (cost) => {
      queryClient.setQueryData(["costs"], (prev) => {
        const isTrue = prev?.find((item) => item.id === cost.id);

        if (!isTrue) return prev ? [cost, ...prev] : [cost];
        else return prev;
      });
    });

    socket?.on("costUpdated", (updatedCost, id) => {
      queryClient.setQueryData(["costs"], (prev) => prev.map((cost) => (cost.id === id ? { ...cost, ...updatedCost } : cost)));
    });

    socket?.on("costDeleted", (costId) => {
      queryClient.setQueryData(["costs"], (prev) => prev.filter((cost) => cost.id !== costId));
    });

    /* ------------- ================ General ================----------------- */

    socket?.on("assigneesAdded", (data, id, query) => {
      queryClient.setQueryData([query], (prev) => prev?.map((item) => (item.id === Number(id) ? data : item)));
    });

    socket?.on("approverAdded", (data, id, query) => {
      queryClient.setQueryData([query], (prev) => prev?.map((item) => (item.id === Number(id) ? data : item)));
    });

    socket?.on("adminsAdded", (data, id) => {
      queryClient.setQueryData("projects", (prev) => prev?.map((item) => (item.id === Number(id) ? data : item)));
    });

    socket?.on("stakeholdersAdded", (data, id) => {
      queryClient.setQueryData("projects", (prev) => prev?.map((item) => (item.id === Number(id) ? data : item)));
    });

    socket?.on("managersAdded", (data, id) => {
      queryClient.setQueryData("projects", (prev) => prev?.map((item) => (item.id === Number(id) ? data : item)));
    });

    /* ------- ===================== Attachments ================== ------------ */

    socket?.on("attachmentAdded", (attachment, type, id, query) => {
      queryClient.setQueryData(["attachments", type, parseInt(id)], (prev) => {
        const isTrue = prev?.find((attach) => attach.id === attachment.id);

        if (!isTrue) {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(id)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      attachmentdb: item._count.attachmentdb + 1,
                    },
                  }
                : item
            )
          );
          return prev ? [attachment, ...prev] : [attachment];
        } else return prev;
      });
    });

    socket?.on("attachmentDeleted", (attachmentId, type, id, query) => {
      queryClient.setQueryData(["attachments", type, parseInt(id)], (prev) => {
        const isTrue = prev?.find((attach) => attach.id === attachmentId);

        if (isTrue) {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(id)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      attachmentdb: item._count.attachmentdb - 1,
                    },
                  }
                : item
            )
          );
          return prev.filter((attachment) => attachment.id !== attachmentId);
        } else return prev;
      });
    });

    socket?.on("commentAdded", (comment, type, id, query) => {
      queryClient.setQueryData(["comments", type, parseInt(id)], (prev) => {
        const isTrue = prev?.find((item) => item.id === comment.id);

        if (!isTrue) {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(id)
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
    });

    socket?.on("subtaskAdded", (subtask, type, id, query) => {
      queryClient.setQueryData(["subtasks", type, parseInt(id)], (prev) => {
        const isTrue = prev?.find((task) => task.id === subtask.id);

        if (!isTrue) {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(id)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      subtaskdb: item._count.subtaskdb + 1,
                    },
                  }
                : item
            )
          );
          return prev ? [subtask, ...prev] : [subtask];
        } else return prev;
      });
    });

    socket?.on("subtaskUpdated", (updatedSubtask, id, type, itemID) => {
      queryClient.setQueryData(["subtasks", type, parseInt(itemID)], (prev) =>
        prev?.map((subtask) => (subtask.id === id ? updatedSubtask : subtask))
      );
    });

    socket?.on("subtaskDeleted", (subtaskId, type, id, query) => {
      queryClient.setQueryData(["subtasks", type, parseInt(id)], (prev) => {
        const isTrue = prev?.find((task) => task.id === subtaskId);

        if (isTrue) {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(id)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      subtaskdb: item._count.subtaskdb - 1,
                    },
                  }
                : item
            )
          );
          return prev.filter((subtask) => subtask.id !== subtaskId);
        } else return prev;
      });
    });

    socket?.on("currencyUpdated", (data) => {
      console.log("updated currency :", data);
      updateRoot(data);
    });

    socket?.on("notification", (data) => {
      console.log("Receive Notification: ", data);
      queryClient.setQueryData(["notifications"], (prev) => (prev ? [data, ...prev] : [data]));
    });

    return () => {
      socket?.off("projectAdded");
      socket?.off("projectUpdated");
      socket?.off("projectDeleted");
      socket?.off("taskAdded");
      socket?.off("taskUpdated");
      socket?.off("taskDeleted");
      socket?.off("costAdded");
      socket?.off("costUpdated");
      socket?.off("costDeleted");
      socket?.off("attachmentAdded");
      socket?.off("attachmentDeleted");
      socket?.off("commentAdded");
      socket?.off("subtaskAdded");
      socket?.off("subtaskUpdated");
      socket?.off("subtaskDeleted");
      socket?.off("notification");
      socket?.off("currencyUpdated");
    };
  }, [user]);

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky top-0">
      <div className="w-full flex gap-4">
        <button onClick={() => setSidebar()} className="text-2xl text-gray-500 block md:hidden">
          ☰
        </button>

        <div className="w-full flex justify-center items-center py-2 px-3 gap-2 rounded-full">
          <h1 className="font-bold">{title}</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <NotificationPanel notifications={notifications} />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
