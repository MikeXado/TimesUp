"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ProjectType } from "@/types";
import useSWR from "swr";
import getProjectsFetcher from "@/lib/functions/get-projects-fetch";
import { useRouter } from "next/navigation";
interface ProjectWithIdType extends ProjectType {
  id: string;
}

function SearchComponent({ projects }: { projects: ProjectWithIdType[] }) {
  const router = useRouter();
  const { data, isLoading } = useSWR<ProjectWithIdType[]>(
    "/api/v1/projects/get",
    getProjectsFetcher,
    {
      fallbackData: projects,
      revalidateOnMount: true,
    }
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <Dialog
      open={isSearchOpen}
      onOpenChange={() => setIsSearchOpen((prev) => !prev)}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            "xl:w-[250px] py-2 px-2 rounded-xl justify-start xl:border text-[#204239] border-gray-400 flex items-center space-x-2  hover:bg-[#bae6a7]"
          )}
        >
          <Search />
          <span className="xl:block hidden">Search</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Command>
          <CommandInput placeholder="Search" />
          <ScrollArea>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <Link
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent "
                  onClick={() => setIsSearchOpen(false)}
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <Link
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent "
                  onClick={() => setIsSearchOpen(false)}
                  href="/dashboard/projects"
                >
                  Projects
                </Link>
                <Link
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent "
                  onClick={() => setIsSearchOpen(false)}
                  href="/dashboard/events"
                >
                  Events
                </Link>
                <Link
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent "
                  onClick={() => setIsSearchOpen(false)}
                  href="/dashboard/pomodoro"
                >
                  Pomodoro
                </Link>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {data?.length === 0 ? (
                  <div className="flex justify-center w-full text-sm">
                    No projects yet.
                  </div>
                ) : (
                  data?.map((project) => {
                    return (
                      <CommandItem
                        className={cn("cursor-pointer")}
                        onSelect={() => {
                          router.push(`/dashboard/projects/${project.id}`);
                          setIsSearchOpen(false);
                        }}
                        key={project.id}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={project.icon}
                              alt={project.title}
                            />
                            <AvatarFallback>GG</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {project.title}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })
                )}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default SearchComponent;
