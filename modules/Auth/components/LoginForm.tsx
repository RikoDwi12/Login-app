/* eslint-disable prettier/prettier */
// eslint-disable-next-line lines-around-directive
"use client";

import { Button, TextInput } from "@mantine/core";
// import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import useInput from "@shared/hooks/useInput";
import { useValidationError } from "@shared/hooks/useValidationError";
import { IRequestLogin } from "@modules/Auth/types/Login";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  // const [visible, setVisible] = useState(false);
  const { input: email, handleInput: setEmail } = useInput();
  const { input: password, handleInput: setPassword } = useInput();
  const router = useRouter();
  const error = useValidationError<IRequestLogin>();

  const { requestLogin, isLoadingLogin, setAuth } = useAuth({
    data: {
      email: email ?? "",
      password: password ?? "",
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await requestLogin();
    if (response.data.token) {
      setAuth({
        token: response.data.token,
        user: response.data.user,
      });
      return router.replace("/dashboard");
    }
    throw new Error("Login failed");
  };

  return (
    <div className="w-3/4 md:w-2/3 flex flex-col mx-auto ">
      <div className="title-bold mb-16 text-center ">
        Halaman Login
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          error={error.email}
          onChange={setEmail}
          type="email"
          required
          label="Email"
          className="mb-4"
          placeholder="Email"
        />
        <TextInput
          error={error.password}
          onChange={setPassword}
          type={ error.password ? "text" : "password"}
          required
          label="Password"
          placeholder="Password"
        />

        <Button loading={isLoadingLogin} className="mt-10" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
