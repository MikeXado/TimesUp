"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
export default function SignUpComponent() {
  const [authError, setAuthError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldValid, setFieldValid] = useState("");
  const router = useRouter();
  const handleSignButton = async (credential) => {
    setIsLoading(true);
    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    if (res.ok) {
      router.push("/provideName");
    }
    setIsLoading(false);
    const message = await res.json();
    setAuthError(message);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.password.length < 6) {
        setFieldValid("Password should be at least 6 characters");
      }
      handleSignButton(values);
    },
  });

  console.log(authError);

  return (
    <>
      <div className="flex justify-center flex-col items-center w-full h-[100vh]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome! Sign Up
        </h1>

        <div className="w-[500px] bg-white p-20 rounded-lg mt-10">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="input-group-1"
                className={`block mb-2 text-sm font-medium ${
                  authError?.message
                    ? "text-red-600"
                    : " text-gray-900 dark:text-white"
                }`}
              >
                {authError?.message ? "Email already in use" : "Your Email"}
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
                  required
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  {...formik.getFieldProps("email")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="website-admin"
                className={`block mb-2 text-sm font-medium ${
                  fieldValid ? "text-red-600" : " text-gray-900 dark:text-white"
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
                  className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("password")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white flex justify-center w-full mt-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {isLoading ? "Wait a sec..." : "Sign Up"}
            </button>
          </form>
          <div className="flex w-full justify-center mt-5">
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
