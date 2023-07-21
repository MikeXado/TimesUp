"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import StartDate from "./project-sheet/start-date";
import EndDate from "./project-sheet/end-date";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectType } from "@/types";
import { parseISO } from "date-fns";
import projectIconFetch from "@/lib/functions/project-icon-fetch";
import { mutate } from "swr";
import { toast } from "@/components/ui/use-toast";
import { ContextMenuItem } from "@/components/ui/context-menu";

interface IFormValues {
  title: string;
  description: string;
  type: string;
  start?: Date;
  end?: Date;
  status: string;
}

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function EditProjectSheet({ project }: { project: ProjectTypeWithId }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    project.icon ? project.icon : null
  );
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { register, control, handleSubmit, watch, reset } =
    useForm<IFormValues>({
      defaultValues: {
        title: project.title,
        description: project.description,
        type: project.type,
        start: parseISO(project.start),
        end: project.end ? parseISO(project.end) : undefined,
        status: project.status,
      },
    });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
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

  const onSubmit: SubmitHandler<FieldValues> = async (form) => {
    let newFilename;
    if (file) {
      const filename = await projectIconFetch(
        file,
        "/api/v1/project/edit_icon"
      );
      newFilename = filename;
    }

    const requestBody = {
      projectId: project.id,
      form: { ...form },
      icon: newFilename,
    };

    const res = await fetch("/api/v1/project/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const messageData = await res.json();
    if (res.ok) {
      mutate("/api/v1/projects");
      toast({
        title: "Success",
        description: messageData.message,
      });
      setIsOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Failed",
        description: messageData.message,
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ContextMenuItem
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        Edit
      </ContextMenuItem>
      <SheetContent
        className={cn("h-full md:min-w-[30%] min-w-full overflow-y-auto")}
      >
        <SheetHeader>
          <SheetTitle className={cn("flex items-center space-x-2")}>
            <span>Edit project</span>
            <ChevronRight size={20} />{" "}
            <span className=" text-muted-foreground text-sm">{project.id}</span>{" "}
          </SheetTitle>
        </SheetHeader>

        <form className=" mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 w-full">
            <Input
              className={cn(
                "border-none outline-none focus-visible:outline-none h-auto focus-visible:ring-0 text-3xl p-0 "
              )}
              id="title"
              placeholder="Enter new project name"
              {...register("title", { required: true })}
            />
          </div>
          <div className="space-y-[5px] w-full mt-5">
            <Label htmlFor="description" className="font-semibold">
              New Description
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
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="image"
                    width={300}
                    height={300}
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
              id="project-type"
              placeholder="write new type of project here"
              className="mt-2"
              required
              {...register("type", { required: true })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-5">
            <StartDate control={control} date={watch("start")} />
            <EndDate control={control} date={watch("end")} />
          </div>

          <div className="w-full mt-5">
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
                    <SelectItem value="proposed">Proposed</SelectItem>
                    <SelectItem value="on-going">On going</SelectItem>
                    <SelectItem value="finished">Finished</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="mt-20">
            <Button
              variant="secondary"
              className={cn(
                " w-full font-bold py-10 rounded-xl text-2xl bg-green-200 transition-all duration-500 ease-in-out text-green-800 hover:text-white hover:bg-green-500"
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

export default EditProjectSheet;
