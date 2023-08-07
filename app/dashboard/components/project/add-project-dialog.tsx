"use client";
import React, { ChangeEvent, useState, ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Calendar } from "../../../../components/ui/calendar";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "../../../../components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { mutate } from "swr";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import projectIconFetch from "@/lib/functions/project-icon-fetch";

function AddProjectSheet({ trigger }: { trigger: ReactNode }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      createBlob(file);
      setFile(file);
    }
  };

  const createBlob = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const blob = new Blob([event.target?.result as ArrayBuffer], {
        type: file.type,
      });
      displayImage(blob);
    };

    reader.readAsArrayBuffer(file);
  };

  const displayImage = (blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    setPreviewUrl(imageUrl);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    setIsLoading(true);
    const filename = await projectIconFetch(file, "/api/v1/project/icon");

    const sendData = {
      title: e.title,
      type: e.type,
      status: e.status,
      start: startDate ? startDate : new Date().toISOString(),
      end: endDate,
      icon: filename,
      description: e.description,
    };

    const res = await fetch("/api/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sendData }),
    });

    const messageData = await res.json();
    if (res.ok) {
      mutate("/api/v1/projects");
      toast({
        title: "Success",
        description: messageData.message,
      });

      reset();
      setFile(null);
      setPreviewUrl(null);
      setStartDate(undefined);
      setEndDate(undefined);
      setIsOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Failed",
        description: messageData.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      <SheetContent
        className={cn("h-full md:min-w-[30%] min-w-full overflow-y-auto")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2 mt-2">
            <span className="block bg-gray-400 h-2 w-2" />
            <Input
              disabled={isLoading}
              required
              {...register("title", { required: true })}
              placeholder="Project name"
              className={cn(
                "border-none outline-none focus-visible:ring-0 px-0 text-xl "
              )}
            />
          </div>
          <div className="space-y-[5px] mt-5 w-full">
            <Label htmlFor="description" className="font-semibold">
              Description
            </Label>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Type new description here..."
            />
          </div>
          <div className="flex items-center mt-5 justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center w-full h-full justify-center pt-5 pb-6">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="image"
                    width={300}
                    height={300}
                    className="h-full"
                  />
                ) : (
                  <>
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> a
                      project icon
                    </p>
                    <p className="text-xs text-gray-500 ">
                      SVG, PNG, JPG or GIF
                    </p>
                  </>
                )}
              </div>
              <input
                disabled={isLoading}
                id="dropzone-file"
                type="file"
                accept=".jpg, .png, .gif"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="mt-5">
            <Label htmlFor="project-type" className="block text-md">
              Project Type
            </Label>
            <Input
              disabled={isLoading}
              id="project-type"
              placeholder="write type of project here"
              className="mt-2"
              required
              {...register("type", { required: true })}
            />
          </div>

          <div className="space-y-5 mt-5">
            {/* Start date input */}
            <div>
              <Label htmlFor="start-date" className="block text-md">
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger className={cn("w-full")}>
                  <div className="border border-input w-[60%]  flex px-3 py-2 items-center justify-between rounded-xl mt-1">
                    <span className="text-gray-500 text-sm">
                      {startDate
                        ? format(startDate, "dd/MM/yyyy")
                        : "pick date"}
                    </span>
                    <CalendarIcon />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px]">
                  <Calendar
                    required={true}
                    mode="single"
                    id="start-date"
                    className="flex justify-center items-center"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* End date input */}
            <div>
              <Label htmlFor="end-date" className="block text-md">
                End Date
              </Label>
              <Popover>
                <PopoverTrigger className={cn("w-full")}>
                  <div className="border border-input w-[60%] flex px-3 py-2 items-center justify-between rounded-xl mt-1">
                    <span className="text-gray-500 text-sm">
                      {endDate ? format(endDate, "dd/MM/yyyy") : "pick date"}
                    </span>
                    <CalendarIcon />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[350px]">
                  <Calendar
                    required={true}
                    mode="single"
                    id="end-date"
                    className="flex justify-center items-center"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="w-full mt-5">
            <Label htmlFor="status" className="font-semibold">
              Status
            </Label>

            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Click to choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposed">Proposed</SelectItem>
                    <SelectItem value="on-going">On going</SelectItem>
                    <SelectItem value="finished">Finished</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            variant="secondary"
            className={cn(
              "bg-green-100 mt-10 py-10 w-full text-green-700 animate-pulse text-xl rounded-xl font-bold hover:bg-green-500 hover:text-white "
            )}
          >
            {isLoading ? "Saving..." : "Create a new project"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default AddProjectSheet;
