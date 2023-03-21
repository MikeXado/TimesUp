"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpFormData {
  email: string;
  password: string;
}

export default function SignUpComponent(): JSX.Element {
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldValid, setFieldValid] = useState("");
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const handleSignButton = async (
    credential: SignUpFormData
  ): Promise<void> => {
    setIsLoading(true);
    const res = await fetch("/api/v1/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const { message } = await res.json();
    if (res.ok) {
      router.push(`/provideName/${message}`);
    }
    setIsLoading(false);
    setAuthError(message);
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    if (data.password.length < 6) {
      setFieldValid("Password should be at least 6 characters");
    }
    handleSignButton(data);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center w-full md:h-screen md:mt-0 mt-10 px-4 pb-3">
        <h1 className="mb-4  text-center font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl sm:text-3xl text-2xl ">
          Welcome! Sign Up
        </h1>

        <div className="w-[500px] max-w-full bg-[#192555] md:p-20 p-10 rounded-lg mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="input-group-1"
                className={`block mb-2 text-sm font-medium ${
                  authError === "auth/email-already-in-use"
                    ? "text-red-600"
                    : " text-white"
                }`}
              >
                {authError === "auth/email-already-in-use"
                  ? "Email already in use"
                  : "Your Email"}
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  id="input-group-1"
                  className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full pl-10 p-2.5  "
                  placeholder="name@gmail.com"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="website-admin"
                className={`block mb-2 text-sm font-medium ${
                  fieldValid ? "text-red-600" : " text-white"
                }`}
              >
                {fieldValid ? fieldValid : "Password"}
              </label>
              <div className="flex">
                {}
                <input
                  type="password"
                  id="website-admin"
                  required
                  className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full  p-2.5  "
                  {...register("password", { required: true })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white flex justify-center w-full mt-10 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {isLoading ? "Wait a sec..." : "Sign Up"}
            </button>
          </form>
          <div className="flex w-full justify-center mt-5 md:flex-row flex-col items-center  text-white">
            <div>Already have an account?</div>
            <Link href="/signIn" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
