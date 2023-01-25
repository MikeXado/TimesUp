import Image from "next/image";
import Link from "next/link";

export default async function Header({ chat }) {
  return (
    <div className="w-full flex  items-center h-20 border-l-2  bg-gray-50 border-gray-300">
      <Link className="ml-2 mr-10" href="/dashboard/chat">
        Back
      </Link>
      <div className="flex sm:items-center py-3 ">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <Image
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-lg font-semibold mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{chat.displayName}</span>
            </div>
            <span className="text-md text-gray-600">{chat.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
