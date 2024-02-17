import { ActivePomoContext } from "@/contexts/pomodoro-state-provider";
import React, { useContext } from "react";
import Alert from "./alert";
import { Pause, Play } from "lucide-react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PomoType } from "@/types";

function Pomo({ pomo }: { pomo: PomoType }) {
  const { state, setState } = useContext(ActivePomoContext);
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
}

export default Pomo;
