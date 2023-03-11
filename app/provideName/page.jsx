"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProvideName() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const provideName = async (values) => {
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

  const onSubmit = (data) => {
    provideName(data);
  };

  return (
    <div className="flex justify-center flex-col items-center w-full md:h-screen md:mt-0 mt-10 px-4 pb-3">
      <h1 className="mb-4  text-center font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl sm:text-3xl text-2xl ">
        Let us know what is your name ?
      </h1>

      <div className="w-[500px] max-w-full bg-[#192555] md:p-20 p-10 rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              First Name
            </label>
            <div className="relative mb-6">
              <input
                type="text"
                className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full p-2.5  "
                placeholder="Gurin"
                {...register("firstName", { required: true })}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Last Name
            </label>
            <div className="flex">
              <input
                type="text"
                className="bg-[#111c44] placeholder-gray-300  text-white text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900  block w-full p-2.5  "
                {...register("lastName", { required: true })}
                placeholder="Mihail"
              />
            </div>
          </div>

          <div className="flex justify-between items-center md:flex-row flex-col  w-full ">
            <Link
              className="border-solid border-[1.5px] border-indigo-500 flex justify-center w-full mt-10  hover:bg-gradient-to-br  from-indigo-500 via-indigo-600 to-indigo-700 text-white focus:ring-4 focus:outline-none focus:ring-indigo-300  font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
              href="/signUp"
            >
              Back
            </Link>
            <button
              type="submit"
              className="text-white flex justify-center w-full md:mt-10 mt-3 bg-gradient-to-r  from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
            >
              {isLoading ? "Wait a sec..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
