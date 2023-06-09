"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignInFormData {
  email: string;
  password: string;
}

interface AuthError {
  message: string;
}

export default function SignInComponents(): JSX.Element {
  const [authError, setAuthError] = useState<AuthError>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const signIn = async (values: SignInFormData): Promise<void> => {
    setIsLoading(true);
    const res = await fetch("/api/v1/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const user = await res.json();
    if (res.ok) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/dashboard");
    }
    setIsLoading(false);
    const message = user;
    setAuthError(message);
  };

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    signIn(data);
  };

  return (
    <div className="flex justify-center flex-col items-center w-full md:h-screen md:mt-0 mt-10 pb-3 px-4">
      <h1 className="mb-4  text-center font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl sm:text-3xl text-2xl ">
        Welcome back! Sign In
      </h1>

      <div className="w-[500px] max-w-full bg-[#192555] lg:p-20 p-10 rounded-lg mt-10">
        <HandleErrorBoundary authError={authError} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Email
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
                id="input-group-1"
                className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full pl-10 p-2.5  "
                placeholder="name@gmail.com"
                required
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="flex">
              <input
                type="password"
                id="website-admin"
                required
                className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full p-2.5  "
                {...register("password", { required: true })}
              />
            </div>
            <Link
              href="/forgotPassword"
              className="underline text-[13px] text-white"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="text-white flex justify-center w-full mt-10 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {isLoading ? "Wait a sec.." : "Sign In"}
          </button>
        </form>
        <div className="flex w-full justify-center mt-5 md:flex-row flex-col items-center  text-white">
          <div>If not have an account?</div>
          <Link href="/signUp" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

function HandleErrorBoundary({
  authError,
}: {
  authError: AuthError | undefined;
}): JSX.Element {
  return (
    <>
      {authError?.message === "auth/wrong-password" ? (
        <WrongPasswordError />
      ) : (
        <></>
      )}
      {authError?.message === "auth/user-not-found" ? <UserNotFound /> : <></>}
      {authError?.message === "auth/too-many-requests" ? (
        <ToManyRequest />
      ) : (
        <></>
      )}
    </>
  );
}

function WrongPasswordError(): JSX.Element {
  return (
    <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
      Ops something went wrong! , please check your email or password and try
      again
    </div>
  );
}

function UserNotFound(): JSX.Element {
  return (
    <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
      Ops something went wrong! , user with this email not found
    </div>
  );
}

function ToManyRequest(): JSX.Element {
  return (
    <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
      Access to this account has been temporarily disabled due to many failed
      login attempts. You can immediately restore it by resetting your password
      or you can try again later.
    </div>
  );
}
