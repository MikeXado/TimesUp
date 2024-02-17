"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
function ResetPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await fetch("/api/v1/auth/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.email),
    });
    const messageData = await res.json();
    if (res.ok) {
      toast({
        title: messageData.message,
      });
    } else {
      toast({
        title: messageData.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Reset Password</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password?</DialogTitle>
          <DialogDescription>
            This action will send you a email where you will can change your
            password
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="Email" className="text-right">
              Email
            </Label>
            <Input
              {...register("email")}
              id="Email"
              type="email"
              placeholder="email@gmail.com"
              className="col-span-3 mt-2"
            />
          </div>

          <Button variant="default">Send Email</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPassword;
