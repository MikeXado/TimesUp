import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getSpecificUser } from "../../../../lib/db";
import dynamic from "next/dynamic";

const UserDropdown = dynamic(() =>
  import("../../components/dashboard/dropdowns/UserDropdown")
);
const OpenSidebar = dynamic(() =>
  import("../../components/dashboard/buttons/OpenSidebar")
);
const Notification = dynamic(() =>
  import("../../components/dashboard/dropdowns/Notification")
);
export default async function Header({ chat }) {
  const user = await getSpecificUser(chat);
  const nextCookies = cookies();
  const uid = nextCookies.get("u_i").value;
  const currentUser = await getSpecificUser(uid);
  return (
    <div className=" w-full flex justify-between items-center h-20  ">
      <div className="flex items-center">
        <Link
          className="ml-5 mr-3 text-white transition-all hover:-translate-x-2/4"
          href="/dashboard/chat"
        >
          <svg
            fill="#fff"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            id="left-arrow"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <line
                id="primary"
                x1="21"
                y1="12"
                x2="3"
                y2="12"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />

              <polyline
                id="primary-2"
                data-name="primary"
                points="6 9 3 12 6 15"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        </Link>

        <Link
          href={`/dashboard/${chat}`}
          className="flex sm:items-center py-3 "
        >
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 -right-[10px] top-[20px]">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <Image
                src={
                  user.photoUrl
                    ? user.photoUrl
                    : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                }
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="lg:text-lg md:text-md sm:text-sm text-sm font-semibold mt-1 flex items-center">
                <span className="text-white mr-3">{user.displayName}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <Notification />
        <OpenSidebar />
        <UserDropdown currentUser={currentUser} />
      </div>
    </div>
  );
}
