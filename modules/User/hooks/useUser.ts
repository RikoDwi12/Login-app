import { useGet } from "@shared/hooks/useApi";
import { IUser } from "../types/User";

const useUser = () => {
  const { data: dataUser } = useGet<IUser[]>({
    url: "/user",
  });

  return {
    dataUser,
  };
};

export default useUser;
