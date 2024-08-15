import { IUser } from "@modules/User/types/User";

export interface IResponseLogin {
  token: string;
  user: IUser;
  permission: string[];
}

export interface IRequestLogin {
  email: string;
  password: string;
}
