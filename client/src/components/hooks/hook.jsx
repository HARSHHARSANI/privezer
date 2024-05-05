import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [data, setData] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsloading(true);
    const toastId = toast.loading(toastMessage || "Updating Data");
    try {
      const res = await mutate(...args);
      if (res.data) {
        toast.success(res.data.message || "Updated Data Successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(
          res?.error?.data?.message ||
            "Failed to update data, please try again",
          {
            id: toastId,
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update data, please try again", {
        id: toastId,
      });
    } finally {
      setIsloading(false);
    }
  };

  return [executeMutation, isloading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };
