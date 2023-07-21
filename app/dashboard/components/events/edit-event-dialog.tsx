"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import DatePopover from "./event-sheet/date-popover";
import TimeSelect from "./event-sheet/time-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";
import { EventType } from "@/types";
import DeleteEventButton from "./delete-event-button";

interface FormType {
  title: string;
  type?: string;
  date?: Date | undefined;
  start: {
    hh: string;
    mm: string;
  };
  end: {
    hh: string;
    mm: string;
  };
  location: string;
}

interface EventTypeWithId extends EventType {
  id: string;
}

interface AddEventSheetProps {
  trigger: React.ReactNode;
  classNames: {
    triggerButtonClassName?: string | null;
    triggerVariant?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null
      | undefined;
  };

  event: EventTypeWithId;
}

function EditEventDialog({ event, trigger, classNames }: AddEventSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, control, reset } = useForm<FormType>({
    defaultValues: {
      date: new Date(),
      title: event.title,
      type: event.type,
      location: event.location,
      start: {
        hh: event.start.hh,
        mm: event.start.mm,
      },
      end: {
        hh: event.end.hh,
        mm: event.end.mm,
      },
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/v1/event/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: event.id, data }),
    });

    const messageData = await res.json();
    if (res.ok) {
      mutate("/api/v1/events");
      toast({
        title: "Success",
        description: messageData.message,
      });
      reset();
      setIsOpen(false);
    } else {
      toast({
        title: "Failed",
        description: messageData.message,
      });
    }
    setIsLoading(false);
  };

  const date = watch("date");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: classNames?.triggerVariant
              ? classNames.triggerVariant
              : "default",
          }),
          classNames?.triggerButtonClassName
        )}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2 mt-2">
            <span className="block bg-gray-400 h-2 w-2" />
            <Input
              required
              {...register("title", { required: true })}
              placeholder="Event title"
              className={cn(
                "border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-xl "
              )}
            />
          </div>
          <div className="space-y-[5px] mt-5 w-full">
            <Label htmlFor="type" className="font-semibold">
              Type
            </Label>
            <Input
              id="type"
              {...register("type", { required: true })}
              placeholder="Write type of event..."
            />
          </div>
          <DatePopover control={control} date={date} />
          <TimeSelect control={control} />

          <div className=" mt-5">
            <Label htmlFor="location">Online/Offline</Label>
            <Controller
              name="location"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn("mt-2")}>
                    <SelectValue placeholder="Where event will take place" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Button
              disabled={isLoading}
              variant="secondary"
              className={cn(
                "bg-green-500 mt-10 hover:bg-green-600 text-lg transition-all duration-200 ease-in-out font-bold text-white py-3 w-full " +
                  (isLoading && " animate-pulse")
              )}
            >
              {isLoading ? "Editing..." : "Edit Event"}
            </Button>

            <DeleteEventButton eventId={event.id} setIsOpen={setIsOpen} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditEventDialog;
