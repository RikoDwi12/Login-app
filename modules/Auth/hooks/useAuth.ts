import { useRecoilState } from "recoil";
import { useApi } from "@shared/hooks/useApi";
import { authStore } from "../stores/auth";
import { IResponseLogin } from "../types/Login";

interface Props {
  data: {
    email: string;
    password: string;
  };
}
export default function useAuth(props?: Partial<Props>) {
  const [Auth, setAuth] = useRecoilState(authStore);

  const { action: requestLogin, isLoading: isLoadingLogin } =
    useApi<IResponseLogin>({
      url: "/login",
      data: {
        email: props?.data?.email,
        password: props?.data?.password,
      },
    });

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return {
    Auth,
    setAuth,
    logout,
    requestLogin,
    isLoadingLogin,
  };
}
