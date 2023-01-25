"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProvideName() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const result = await fetch("/api/provideName", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (result.status === 200) {
        router.push("/signIn");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="flex justify-center flex-col items-center w-full h-[100vh]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Let us know what is your name ?
      </h1>

      <div className="w-[500px] bg-white p-20 rounded-lg mt-10">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <div className="relative mb-6">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Gurin"
                {...formik.getFieldProps("firstName")}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <div className="flex">
              <input
                type="text"
                className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...formik.getFieldProps("lastName")}
                placeholder="Mihail"
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
              {isLoading ? "Wait a sec..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
