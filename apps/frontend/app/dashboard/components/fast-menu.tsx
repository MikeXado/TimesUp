"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Wand2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Pomodoro from "./fast-menu/pomodoro";
import Gpt from "./fast-menu/gpt";

function FastMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "fixed bottom-4 text-green-800 z-40 right-4 bg-[#daf8c9] h-[60px] w-[60px] flex justify-center items-center rounded-full shadow-lg ",
          !isOpen && " animate-bounce"
        )}
      >
        <Wand2 size={30} />
      </PopoverTrigger>
      <PopoverContent className={cn("w-[600px]")}>
        <Tabs defaultValue="pomodoro" className={cn("w-full mt-5")}>
          <TabsList
            className={cn(
              "bg-transparent border-b-2 border-gray-200 rounded-none w-full justify-start"
            )}
          >
            <TabsTrigger
              className={cn(
                " font-semibold border-green-500 rounded-none duration-75 data-[state=active]:bg-none data-[state=active]:border-b-2 py-2.5 data-[state=active]:text-green-500 data-[state=active]:shadow-none hover:border-b-2 hover:text-green-500"
              )}
              value="pomodoro"
            >
              Pomodoro
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                " font-semibold border-green-500 rounded-none duration-75 data-[state=active]:bg-none data-[state=active]:border-b-2 py-2.5 data-[state=active]:text-green-500 data-[state=active]:shadow-none hover:border-b-2 hover:text-green-500"
              )}
              value="gpt"
            >
              GPT
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pomodoro">
            <Pomodoro />
          </TabsContent>
          <TabsContent value="gpt">
            <Gpt />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

export default FastMenu;
