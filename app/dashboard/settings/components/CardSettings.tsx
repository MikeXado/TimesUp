"use client";

import PhotoInput from "./PhotoInput";
import { toast } from "react-toastify";
import { UserData } from "../../../../types";

export default function CardSettings({
  register,
  handleSubmit,
  currentUserUid,
  setValue,
}) {
  const changeProfile = async (data: UserData, image: string) => {
    const newProfile = {
      displayName: data.displayName,
      city: data.city,
      country: data.country,
      email: data.email,
      photoUrl: image,
      uid: currentUserUid,
    };
    await fetch("/api/changeProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    });
    toast.success("Profile updated successfully!");
  };

  const onSubmit = async (data) => {
    const newForm = new FormData();
    newForm.append("file", data.file[0]);
    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: newForm,
    });

    const url = res.json();
    const image = await url;

    setValue("photoUrl", image);
    changeProfile(data, image);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-[#111c44] mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-white text-xl font-bold">My account</h6>
              <button
                type="submit"
                className="bg-[#6e6ae4] text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Change
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-[#111c44]">
            <h6 className="text-white text-sm mt-3 mb-6 font-bold uppercase">
              Upload image
            </h6>
            <PhotoInput register={register} />
            <h6 className="text-white text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 bg-[#192555] placeholder-white text-white  rounded text-sm shadow focus:outline-none focus:ring-[#6e6ae4] focus:border-[#6e6ae4] focus:ring w-full ease-linear transition-all duration-150"
                    {...register("displayName")}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 bg-[#192555] placeholder-white text-white  rounded text-sm shadow focus:outline-none focus:ring-[#6e6ae4] focus:border-[#6e6ae4] focus:ring w-full ease-linear transition-all duration-150"
                    {...register("email")}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-white text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    className="border-0 px-3 py-3 bg-[#192555] placeholder-white text-white  rounded text-sm shadow focus:outline-none focus:ring-[#6e6ae4] focus:border-[#6e6ae4] focus:ring w-full ease-linear transition-all duration-150"
                    {...register("city")}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 bg-[#192555] placeholder-white text-white  rounded text-sm shadow focus:outline-none focus:ring-[#6e6ae4] focus:border-[#6e6ae4] focus:ring w-full ease-linear transition-all duration-150"
                    {...register("country")}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-white text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 max-h-[200px] bg-[#192555] placeholder-white text-white  rounded text-sm shadow focus:outline-none focus:ring w-full focus:ring-[#6e6ae4] focus:border-[#6e6ae4] ease-linear transition-all duration-150"
                    rows="3"
                    {...register("about")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
