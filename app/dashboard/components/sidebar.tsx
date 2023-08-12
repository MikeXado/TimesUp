"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import useSWR from "swr";
import { ProjectType } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "../../../components/ui/dialog";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import fetcher from "@/lib/functions/fetcher";
const AddProjectDialog = dynamic(() => import("./project/add-project-dialog"));

interface ProjectTypeWithId extends ProjectType {
  id: string;
}

function Sidebar() {
  const { data } = useSWR<ProjectTypeWithId[]>("/api/v1/projects", fetcher);
  const params = useParams();
  const currentProject = params?.projectId;

  return (
    <div className="bg-white rounded-tl-3xl sm:block hidden  border-r border-gray-300 w-[80px]">
      <ul className="mt-5 space-y-5">
        {data?.map((project, index) => {
          return (
            <Link
              href={`/dashboard/projects/${project.id}`}
              key={project.id}
              className={`block cursor-pointer mx-auto hover:border-2 h-14 w-14 border-gray-500 ${
                currentProject === project.id && "border-2"
              } rounded-full p-[2px] duration-75 transition-all ease-in-out `}
            >
              <Avatar className="w-full h-full">
                <AvatarImage src={project.icon} alt="project-icon" />
                <AvatarFallback>P-{index + 1}</AvatarFallback>
              </Avatar>
            </Link>
          );
        })}
      </ul>

      <AddProjectDialog
        trigger={
          <DialogTrigger
            className={cn(
              "mt-5 p-2 w-[60px] h-[60px] mx-auto rounded-full flex items-center  justify-center transition-all duration-300 ease-in-out hover:bg-gray-200 "
            )}
          >
            <Plus className="w-10 h-10" />
          </DialogTrigger>
        }
      />
    </div>
  );
}

export default Sidebar;
