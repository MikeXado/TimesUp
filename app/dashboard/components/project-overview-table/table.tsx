import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProjectType } from "@/types";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import ProjectsCards from "../../projects/components/projects-cards";

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function ProjectsOverviewTable({
  projects,
}: {
  projects: ProjectTypeWithId[];
}) {
  const router = useRouter();

  const handleProjectView = (id: string) => {
    router.push(`/dashboard/projects/${id}`);
  };

  return (
    <div className="relative  lg:block hidden ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-900 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Project Type
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Project Progress
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const progress = Math.floor(
              (project.completed_tasks / project.total_tasks) * 100
            );
            return (
              <tr key={project.id} className="bg-white ">
                <th
                  scope="row"
                  className="  hover:shadow-lg px-6 py-4 flex items-center space-x-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Avatar>
                    <AvatarImage src={project.icon} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <span> {project.title}</span>
                </th>
                <td className="px-6 py-4">{project.type}</td>
                <td className="px-6 py-4">
                  {format(parseISO(project.start), "dd/MM/yyyy")}
                </td>
                <td className="px-6 py-4">
                  {project.end
                    ? format(parseISO(project.end!), "dd/MM/yyyy")
                    : "Not provided"}
                </td>
                <td className="px-6 py-4 ">
                  <div className="flex items-center space-x-4">
                    <Progress
                      value={progress}
                      thumbColor="bg-green-600"
                      className={cn("h-[8px] bg-gray-300")}
                    />
                    <span className="font-medium text-lg">
                      {project.total_tasks === 0 ? 0 : progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => handleProjectView(project.id)}
                    variant="secondary"
                    className={cn(
                      "bg-green-50 text-green-700 font-bold hover:bg-green-100"
                    )}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsOverviewTable;
