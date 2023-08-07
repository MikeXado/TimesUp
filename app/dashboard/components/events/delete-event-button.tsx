import React, { useState } from "react";
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
import { mutate } from "swr";
import { toast } from "@/components/ui/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
function DeleteEventButton({
  eventId,

  setIsOpen,
}: {
  eventId: string;
  setIsOpen: (prev: boolean) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await fetch(`/api/v1/events/${eventId}`, {
      method: "DELETE",
    });

    const messageData = await res.json();
    if (res.ok) {
      mutate("/api/v1/events");
      toast({
        title: "Success",
        description: messageData.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed",
        description: messageData.message,
      });
    }
    setIsDeleting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={cn(
          buttonVariants({ variant: "secondary" }) +
            " bg-red-500 mt-10 hover:bg-red-600 text-lg transition-all duration-200 ease-in-out font-bold text-white py-3 w-full "
        )}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            event and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteEventButton;
