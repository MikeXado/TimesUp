import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-indigo-600 px-2 text-sm rounded text-white rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-indigo-600 group active:text-indigo-700 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link href="/">Go Home</Link>
          </span>
        </a>
      </button>
    </div>
  );
}
