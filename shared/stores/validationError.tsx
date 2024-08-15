import { atom } from "recoil";

export const validationError = atom<unknown>({
  key: "validationError",
  default: {},
});
