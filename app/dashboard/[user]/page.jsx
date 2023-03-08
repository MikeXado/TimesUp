import Image from "next/image";
import { getSpecificUser } from "../../../lib/db";

export default async function UserInfo({ params: { user } }) {
  const specificUser = await getSpecificUser(user);

  return (
    <div className="mx-4 mt-32 mb-6">
      <div className="relative flex flex-col min-w-0  break-words  bg-[#111c44]  w-full  shadow-xl rounded-lg ">
        <div className="px-6 ">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="absolute top-[-20px]">
                <Image
                  src={
                    specificUser.photoUrl
                      ? specificUser.photoUrl
                      : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  }
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full w-[100px] h-[100px] max-w-full"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-32">
            <h1 className="text-2xl font-semibold leading-normal mb-2 text-white">
              {specificUser.displayName}
            </h1>
            <div className="mb-2 text-gray-300">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-300"></i>
              {specificUser.email}
            </div>
            <div className="text-md leading-normal mt-5 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {specificUser.city ? specificUser.city + "," : ""}{" "}
              {specificUser.country}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-gray-500 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-white">
                  {specificUser.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
