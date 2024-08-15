import { authStore } from "@modules/Auth/stores/auth";
import { validationError } from "@shared/stores/validationError";
import Notification from "@shared/utils/notification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

interface Data {
  data: IResponse<Response, Error>;
  status: number;
}

/**
 * Hook to handle error response from API
 */
const useErrorApiHandler = () => {
  const [data, setData] = useState<Data | null>(null);
  const setValidationError = useSetRecoilState(validationError);
  const setAuth = useSetRecoilState(authStore);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const { status, data: responseData } = data;

      switch (status) {
        case 200:
        case 201:
          setValidationError({});
          break;
        case 422:
          setValidationError(responseData?.errors || {});
          break;
        case 403:
          setAuth({ token: null, user: null });
          router.replace("/login");
          Notification.error("You are not authorized to access this page");
          break;
        case 500:
          Notification.error("Internal server error. Please try again later.");
          break;
        default:
          Notification.error("An unexpected error occurred.");
          break;
      }
    }
  }, [data, setAuth, setValidationError, router]);

  return {
    setData,
  };
};

export default useErrorApiHandler;
