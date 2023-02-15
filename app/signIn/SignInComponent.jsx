"use client";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function SignInComponents() {
  const { data } = useSWR("/api/getTasks");
  console.log(data);
  const [authError, setAuthError] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const signIn = async (values) => {
    setIsLoading(true);

    const res = await fetch("/api/signIn", {
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
    const { message } = user;
    setAuthError(message);
  };

  const onSubmit = (data) => {
    signIn(data);
  };

  return (
    <div className="flex justify-center flex-col items-center w-full h-[100vh]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome back! Sign In
      </h1>

      <div className="w-[500px] bg-white p-20 rounded-lg mt-10">
        {authError?.code === "auth/wrong-password" ? (
          <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
            Ops something went wrong! , please check your email or password and
            try again
          </div>
        ) : authError?.code === "auth/user-not-found" ? (
          <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
            Ops something went wrong! , user with this email not found
          </div>
        ) : authError?.code === "auth/too-many-requests" ? (
          <div className="text-red-600 font-medium text-sm pl-2 pr-2 text-center mb-5">
            Access to this account has been temporarily disabled due to many
            failed login attempts. You can immediately restore it by resetting
            your password or you can try again later.
          </div>
        ) : (
          <></>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="flex">
              <input
                type="password"
                id="website-admin"
                required
                className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("password", { required: true })}
              />
            </div>
            <Link href="/forgotPassword" className="underline text-[13px]">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="text-white flex justify-center w-full mt-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {isLoading ? "Wait a sec.." : "Sign In"}
          </button>
        </form>
        <div className="flex w-full justify-center mt-5">
          <div>If not have an account?</div>
          <Link href="/signUp" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
