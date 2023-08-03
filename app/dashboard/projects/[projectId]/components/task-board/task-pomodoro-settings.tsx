import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PomoType } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useSWR from "swr";
import { getPomodoroFetcher } from "@/lib/functions/get-pomodoro-settings-fetch";
interface PomodoroFormType {
  estPomo: number[];
  focus: number[];
  short: number[];
  long: number[];
}

function TaskPomodoro({
  taskId,
  title,
  projectId,
}: {
  taskId: string;
  title: string;
  projectId: string;
}) {
  const { data, mutate } = useSWR<PomoType>(
    "/api/v1/project/tasks/pomodoro/get",
    () => getPomodoroFetcher(projectId, taskId),
    {
      suspense: true,
    }
  );

  console.log(data);
  const { control, watch, handleSubmit } = useForm<PomodoroFormType>({
    defaultValues: {
      estPomo: [data?.estPomo],
      focus: [data?.focus],
      short: [data?.short],
      long: [data?.long],
    },
  });

  const estPomoValue = watch("estPomo");
  const focusValue = watch("focus");
  const shortValue = watch("short");
  const longValue = watch("short");

  console.log(estPomoValue);
  const onSubmit: SubmitHandler<PomodoroFormType> = async (data) => {
    const requestData = {
      focus: data.focus[0],
      estPomo: data.estPomo[0],
      short: data.short[0],
      long: data.long[0],
      done: 0,
      _updatedAt: new Date().toLocaleDateString(),
      title,
    };

    const res = await fetch("/api/v1/project/tasks/pomodoro/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: requestData,
        taskId: taskId,
        projectId: projectId,
      }),
    });

    const messageData = await res.json();
    if (res.ok) {
      toast({
        title: messageData.message,
      });
      mutate();
    } else {
      toast({
        variant: "destructive",
        title: messageData.message,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger className=" text-muted-foreground">
        <Clock />
      </PopoverTrigger>
      <PopoverContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="estPomo">Est Pomodoros: {estPomoValue[0]}</Label>
            <Controller
              name="estPomo"
              control={control}
              render={({ field }) => (
                <Slider
                  className="mt-2"
                  min={1}
                  max={100}
                  step={1}
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="focus">Focus Time: {focusValue[0]}</Label>
            <Controller
              name="focus"
              control={control}
              render={({ field }) => (
                <Slider
                  id="focus"
                  className="mt-2"
                  min={5}
                  max={100}
                  step={5}
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="short">Short break time: {shortValue[0]}</Label>
            <Controller
              name="short"
              control={control}
              render={({ field }) => (
                <Slider
                  id="short"
                  className="mt-2"
                  min={5}
                  max={100}
                  step={5}
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="long">Long break time: {longValue[0]}</Label>
            <Controller
              name="long"
              control={control}
              render={({ field }) => (
                <Slider
                  id="long"
                  className="mt-2"
                  min={5}
                  max={100}
                  step={5}
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                />
              )}
            />
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default TaskPomodoro;
