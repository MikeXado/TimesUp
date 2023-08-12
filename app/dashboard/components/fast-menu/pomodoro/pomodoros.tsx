import { ScrollArea } from "@/components/ui/scroll-area";
import { PomoType } from "@/types";
import React, { useState } from "react";
import useSWR from "swr";

import fetcher from "@/lib/functions/fetcher";
import ProjectSelect from "./project-select";
import Pomo from "./pomo";

function Pomodoros({ pomos }: { pomos: PomoType[] }) {
  const [projectId, setProjectId] = useState("");
  const { data, mutate, isLoading } = useSWR<PomoType[]>(
    projectId ? `/api/v1/project/${projectId}/tasks/pomodoro` : null,
    fetcher
  );

  const PomodorosList = () => {
    if (!projectId) {
      return (
        <div className="flex justify-center w-full items-center mt-10">
          Choose an project
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="flex justify-center w-full items-center mt-10">
          Loading...
        </div>
      );
    } else {
      return (
        <ul className="mt-2 space-y-5">
          {data?.map((pomo) => {
            return <Pomo key={pomo.id} pomo={pomo} />;
          })}
        </ul>
      );
    }
  };

  return (
    <ScrollArea className="h-[300px] mt-5 ">
      <div className="px-4">
        <div className="flex items-center mt-5 space-x-2">
          <ProjectSelect setProjectId={setProjectId} mutate={mutate} />
          <span className=" text-sm ">Tasks({data ? data.length : 0})</span>
        </div>
        <PomodorosList />
      </div>
    </ScrollArea>
  );
}

export default Pomodoros;
