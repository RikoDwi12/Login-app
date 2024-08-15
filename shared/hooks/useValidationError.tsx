import { validationError } from "@shared/stores/validationError";
import { useRecoilValue } from "recoil";

// use this hook to get the validation error
export function useValidationError<Model>() {
  return useRecoilValue(validationError) as Record<keyof Model, string>;
}
