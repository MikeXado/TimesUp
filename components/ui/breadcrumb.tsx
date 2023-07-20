import Link from "next/link";
import React from "react";

interface PathMappingType {
  [key: string]: string;
}
function Breadcrumb({ pathname }: { pathname: string | null }) {
  const pathMappings: PathMappingType = {
    pomodoro: "Pomodoro",
    projects: "Projects",
    dashboard: "Dashboard",
    events: "Events",
  };

  const path = pathname?.split("/").map((el) => {
    if (el in pathMappings) {
      return { title: pathMappings[el], value: el };
    } else {
      return {
        title: el,
        value: el,
      };
    }
  });

  return (
    <nav className="flex">
      <ul className="inline-flex flex-wrap items-center ">
        {path?.map((li, index) => {
          return (
            <li key={li.value}>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className={
                    "w-5 h-5 text-gray-400" + (index >= 2 ? " " : " hidden")
                  }
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  href={li.value}
                  className=" text-sm text-gray-500 hover:underline "
                >
                  {li.title}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
