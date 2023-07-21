"use client";
import React, { useEffect, useState } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SubtaskType, TaskType } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddSubtasks from "./task-sheet/add-subtasks";
import useSWR, { mutate } from "swr";
import getSubtasksFetcher from "@/lib/functions/get-subtasks-fetch";
import AddLabels from "./task-sheet/add-labels";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import mergeSubtasks from "@/lib/functions/merge-subtasks";
interface TaskTypeWithId extends TaskType {
  id: string;
  completedTasks?: number;
  tasks?: number;
}

interface SubtaskTypeWithId extends SubtaskType {
  id?: string;
}

interface IFormValues {
  title: string;
  description: string;
  priority: string;
  status: string;
}

function EditTaskDialog({
  projectId,
  taskId,
  task,
  trigger,
  isOpen,
  setIsOpen,
}: {
  projectId: string;
  taskId: string;
  trigger: React.ReactNode;
  task: TaskTypeWithId;
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
}) {
  const { data } = useSWR<SubtaskTypeWithId[]>(
    "/api/v1/project/tasks/subtasks/get",
    (url) => getSubtasksFetcher(url, projectId, taskId)
  );

  const [subtasks, setSubtasks] = useState<SubtaskTypeWithId[]>([]);
  const [labels, setLabels] = useState<string[]>(task.labels);
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      status: task?.status,
    },
  });

  useEffect(() => {
    if (data) {
      const updatedSubtasks = mergeSubtasks(data, subtasks);
      // Now, localSubtasks contains both the local unsaved subtasks and the fetched subtasks
      setSubtasks(updatedSubtasks);
    }
  }, [data, subtasks]);

  useEffect(() => {
    setLabels(task.labels);
  }, [task.labels]);
  console.log(task);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const taskData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      labels: labels,
      _createdAt: task._createdAt,
      _updatedAt: new Date().toISOString(),
      status: data.status,
    };
    const ref = await fetch("/api/v1/project/tasks/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        taskId,
        taskData,
        subtasks,
      }),
    });

    if (ref.ok) {
      setIsOpen(false);
      mutate(`/api/v1/project/tasks/get?status=${taskData.status}`, null, true);
      mutate("/api/v1/project/tasks/subtasks/get", null, true);
      const data = await ref.json();
      toast({
        title: "Success",
        description: data.message,
      });
    } else {
      const data = await ref.json();
      toast({
        variant: "destructive",
        title: "Failed",
        description: data.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      <SheetContent
        className={cn("h-full md:min-w-[50%] min-w-full overflow-y-auto")}
      >
        <SheetHeader>
          <SheetTitle className={cn("flex items-center space-x-2")}>
            <span>Edit task</span>
            <ChevronRight size={20} />{" "}
            <span className=" text-muted-foreground text-sm">{taskId}</span>{" "}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <div className="space-y-1 w-full">
            <Input
              className={cn(
                "border-none outline-none focus-visible:outline-none h-auto focus-visible:ring-0 text-3xl p-0 "
              )}
              id="title"
              placeholder="Enter new task name"
              {...register("title", { required: true })}
            />
          </div>
          <div className="space-y-[5px] w-full">
            <Label htmlFor="description" className="font-semibold">
              New Description
            </Label>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Type new description here..."
            />
          </div>

          <div className="w-full">
            <Label htmlFor="status" className="font-semibold">
              Status
            </Label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Click to choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="w-full">
            <Label htmlFor="priority" className="font-semibold">
              Priority
            </Label>

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Click to choose priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <AddSubtasks
            projectId={projectId}
            taskId={taskId}
            subtasks={subtasks}
            setSubtasks={setSubtasks}
          />

          <AddLabels labels={labels} setLabels={setLabels} />

          <div className="mt-5">
            <Button
              variant="secondary"
              className={cn(
                " w-full font-bold py-3 rounded-xl text-2xl bg-green-200 transition-all duration-500 ease-in-out text-green-800 hover:text-white hover:bg-green-500"
              )}
            >
              Submit Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default EditTaskDialog;
