"use client";

import LoginForm from "@modules/Auth/components/LoginForm";
import Image from "next/image";

export default function LoginPage(): JSX.Element {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-5/12 m-auto relative">
        <div className="flex flex-col justify-center">
          <LoginForm />
        </div>
      </div>

      <div className="w-7/12 relative rounded-l-3xl overflow-hidden shadow m-2">
        <Image
          src="/images/halamanlogin.png"
          fill
          alt="bg-login"
          className=""
        />
      </div>
    </div>
  );
}
