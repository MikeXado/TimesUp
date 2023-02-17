"use client";

import Image from "next/image";

export default function CardProfile({ watch }) {
  const username = watch("displayName");
  const email = watch("email");
  const city = watch("city");
  const country = watch("country");
  const about = watch("about");
  const photoUrl = watch("photoUrl");
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-5">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="absolute top-[-20px]">
                <Image
                  src={photoUrl}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            </div>
            {/* <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div> */}
          </div>
          <div className="text-center mt-32">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
              {username}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {city ? city + "," : ""} {country}
            </div>
            <div className="mb-2 text-blueGray-600 mt-5">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {email}
            </div>
            {/* <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div> */}
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
