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

const userAsyncMutation = (mutationHook) => {
  const [data, setData] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsloading(true);
    const toastId = toast.loading(toastMessage || "Updating Data");
    try {
      const res = await mutate(...args);
      if (res.data) {
        setData(res.data);
        toast.success(res.data.message || "Updated Data Successfully", {
          id: toastId,
        });
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

export { useErrors, userAsyncMutation };
