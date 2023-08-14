import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectType } from "@/types";
import useSWR, { MutatorCallback } from "swr";
import fetcher from "@/lib/functions/fetcher";

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function ProjectSelect({
  setProjectId,
  mutate,
}: {
  setProjectId: (prev: string) => void;
  mutate: MutatorCallback;
}) {
  const { data, isLoading } = useSWR<ProjectTypeWithId[]>(
    "/api/v1/projects",
    fetcher
  );

  const onChange = (value: string) => {
    setProjectId(value);
    mutate();
  };
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="projects" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map((project) => {
            return (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
}

export default ProjectSelect;
