"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUp() {
  const [authError, setAuthError] = useState();
  const [isEmailSend, setIsEmailSend] = useState(false);

  const router = useRouter();
  const handleSignButton = async (credential) => {
    await fetch("/api/forgotPassword", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((res) => {
      if (res.status === 200) {
        setIsEmailSend((prev) => !prev);
      }
      setAuthError(res.statusText);
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      handleSignButton(values);
    },
  });

  return (
    <>
      <div className="flex justify-center flex-col items-center w-full h-[100vh]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Reset Password
        </h1>

        <div className="w-[500px] bg-white p-20 rounded-lg mt-10">
          {isEmailSend ? (
            <>
              <div className="text-green-500 font-medium text-sm pl-2 pr-2 text-center mb-5">
                Pleace check your inbox , and reset your password
              </div>
              <Link
                className="text-white flex justify-center w-full mt-10 bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
                href="/signIn"
              >
                Back
              </Link>
            </>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="input-group-1"
                  className={`block mb-2 text-sm font-medium ${
                    authError
                      ? "text-red-600"
                      : " text-gray-900 dark:text-white"
                  }`}
                >
                  {authError ? "Email not registered" : "Your Email"}
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
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    {...formik.getFieldProps("email")}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center w-full ">
                <Link
                  className="border-solid border-[1.5px] border-blue-500 flex justify-center w-full mt-10  hover:bg-gradient-to-br  from-blue-500 via-blue-600 to-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
                  href="/signUp"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="text-white flex justify-center w-full mt-10 bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
                >
                  Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
