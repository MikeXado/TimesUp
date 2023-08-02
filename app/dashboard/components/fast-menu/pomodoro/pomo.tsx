import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivePomoContext } from "@/contexts/pomodoro-state-provider";
import { cn } from "@/lib/utils";
import { PomoType } from "@/types";
import { Pause, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Alert from "./alert";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

function Pomo({ pomos }: { pomos: PomoType[] }) {
  const { state, setState } = useContext(ActivePomoContext);

  return (
    <ScrollArea className="h-[300px] mt-5 ">
      <div className="px-4">
        <div className=" text-sm mt-5">Tasks(15)</div>
        <ul className="mt-1 space-y-5">
          {pomos.map((pomo) => {
            return (
              <li
                key={pomo.id}
                className="flex justify-between items-center border p-5 rounded-xl"
              >
                <div>
                  <h4 className="font-bold text-lg">{pomo.title}</h4>
                  <span className="font-medium text-md">
                    {pomo.done}/{pomo.estPomo} Est Pomodoros
                  </span>
                </div>
                {state?.id === pomo.id ? (
                  <Alert
                    trigger={
                      <span>
                        <Pause fill="#fff" />
                      </span>
                    }
                    triggerClassName="bg-green-500 rounded-full text-white h-[50px] w-[50px] flex justify-center items-center hover:bg-green-600"
                    triggerButtonVariant="secondary"
                    alertFooter={
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            setState(undefined);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    }
                  />
                ) : (
                  <Button
                    onClick={() => {
                      setState(pomo);
                    }}
                    variant="secondary"
                    className={cn(
                      "bg-green-500 rounded-full text-white h-[50px] w-[50px] flex justify-center items-center hover:bg-green-600"
                    )}
                  >
                    <Play fill="#fff" />
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </ScrollArea>
  );
}

export default Pomo;
