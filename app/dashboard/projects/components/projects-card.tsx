import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types";
import { format, parseISO } from "date-fns";
import { Calendar, CheckCheck } from "lucide-react";

import { useRouter } from "next/navigation";

import React from "react";

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function ProjectCard({ project }: { project: ProjectTypeWithId }) {
  const router = useRouter();

  const handleProjectClick = () => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const progress = Math.floor(
    (project.completed_tasks / project.total_tasks) * 100
  );

  return (
    <li
      onClick={handleProjectClick}
      className="bg-white shadow-lg cursor-pointer border rounded-xl p-3 w-full group relative"
    >
      <div className="block cursor-pointer  group-hover:border-2 h-[60px] w-[60px] border-gray-500 rounded-full p-[2px] duration-75 transition-all ease-in-out ">
        <Avatar className="w-full h-full">
          <AvatarImage src={project.icon} />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
      </div>

      <h3 className="font-bold text-lg text-card-foreground mt-2">
        {project.title}
      </h3>
      <p className="mt-2 text-muted-foreground truncate">
        {project.description}
      </p>

      <span className="text-sm bg-slate-500 font-bold text-white px-2 py-2 rounded-xl mt-5 inline-block">
        {project.type}
      </span>

      <div className="flex items-center space-x-4 mt-5">
        <Progress
          value={progress}
          thumbColor="bg-green-600"
          className={cn("h-[10px] bg-gray-300")}
        />
        <span className="font-medium text-lg">
          {project.total_tasks === 0 ? 0 : progress}%
        </span>
      </div>

      <div className="mt-5 sm:flex sm:items-center sm:space-x-4">
        <div className="flex items-center space-x-1 text-gray-500">
          <CheckCheck />
          <span>
            {project.completed_tasks}/{project.total_tasks}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 sm:mt-0 mt-2">
          <div className="flex items-center space-x-1 ">
            <Calendar />
            <span>{format(parseISO(project.start), "dd/MM/yyyy")}</span>
          </div>
          {project.end && (
            <>
              <span>-</span>
              <span>{format(parseISO(project.end), "dd/MM/yyyy")}</span>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
