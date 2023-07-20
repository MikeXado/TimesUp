"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

import AddSubtasks from "./task-sheet/add-subtasks";
import AddLabels from "./task-sheet/add-labels";
import AddDate from "./task-sheet/add-date";
import { Button } from "../../../../components/ui/button";
import {
  FieldValues,
  SubmitHandler,
  Controller,
  useForm,
} from "react-hook-form";
import { SubtaskType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

interface IFormValues {
  title: string;
  description: string;
  priority: string;
  _createdAt?: Date;
  status: string;
}

function AddTaskSheet({
  trigger,
  uid,
  id,
}: {
  trigger: React.ReactNode;
  uid: string;
  id: string;
}) {
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit, watch, reset } =
    useForm<IFormValues>({
      defaultValues: {
        title: "",
        description: "",
        priority: "Low",
        _createdAt: new Date(),
        status: "todo",
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const taskData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      labels: labels,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      status: data.status,
    };
    const ref = await fetch("/api/v1/project/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        id,
        taskData,
        subtasks,
      }),
    });

    if (ref.ok) {
      mutate(`/api/v1/project/tasks/get?status=${taskData.status}`);
      const data = await ref.json();
      toast({
        title: "Success",
        description: data.message,
      });
      reset();
      setSubtasks([]), setLabels([]);
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

  const date = watch("_createdAt");

  console.log(watch("status"));
  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger>{trigger}</SheetTrigger>
        <SheetContent
          side="right"
          className="min-w-[30%] h-full overflow-y-auto"
        >
          <SheetHeader className="mt-5">
            <SheetTitle>Create New Task</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
            <div className="space-y-1 w-full">
              <Input
                className={cn(
                  "border-none outline-none h-auto focus-visible:ring-0 text-3xl p-0 "
                )}
                id="title"
                placeholder="Enter task name"
                {...register("title", { required: true })}
              />
            </div>
            <div className="space-y-[5px] w-full">
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Textarea
                {...register("description", { required: true })}
                placeholder="Type description here..."
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

            {/* Add subtasks form */}
            <AddSubtasks subtasks={subtasks} setSubtasks={setSubtasks} />

            {/* Add Labels form */}

            <AddLabels labels={labels} setLabels={setLabels} />
            <div className="mt-5">
              <Button
                disabled={isLoading}
                variant="secondary"
                className={cn(
                  " w-full font-bold py-3 rounded-lg text-xl bg-green-200 transition-all duration-500 ease-in-out text-green-800 hover:text-white hover:bg-green-500"
                )}
              >
                {isLoading ? "Creating..." : "Create new task"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddTaskSheet;
