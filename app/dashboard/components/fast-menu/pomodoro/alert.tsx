import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertProps {
  trigger: React.ReactNode;
  triggerClassName: string;
  triggerButtonVariant:
    | "secondary"
    | "default"
    | "outline"
    | "destructive"
    | "ghost"
    | "link";
  alertFooter: React.ReactNode;
}

function Alert({
  trigger,
  triggerClassName,
  triggerButtonVariant,
  alertFooter,
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(triggerClassName)}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will not save your current
            pomodoro progress
          </AlertDialogDescription>
        </AlertDialogHeader>
        {alertFooter}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
