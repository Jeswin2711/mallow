import { toast } from "sonner";

const useNotification = () => {
  return {
    notifySuccess: (msg: string) =>
      toast.success(msg, {
        duration : 1000,
        style: {
          background: "#065f46",
          color: "#d1fae5",
        },
      }),
    notifyInfo: (msg: string) =>
      toast.info(msg, {
        duration : 1000,
        style: {
          background: "#bb626340",
          color: "#bb2124",
        },
      }),
    notifyError: (msg: string) =>
      toast.error(msg, {
        duration : 1000,
        style: {
          background: "#bb626340",
          color: "#bb2124",
        },
      }),
  };
};

export default useNotification;
