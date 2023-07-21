"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ResetPassword from "./reset-password";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UserIconForm from "./account-form-user-icon";
import { UserType } from "@/types";
import userIconFetch from "@/lib/functions/user-icon-fetch";
import updateUserFetch from "@/lib/functions/update-user-fetch";

interface AccountFormType {
  displayName: string;
  file: File | null;
}

function AccountForm() {
  const { register, handleSubmit } = useForm<AccountFormType>();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const photoUrl = await userIconFetch(file);
    const requestBody = {
      displayName: data.displayName,
      photoUrl: photoUrl,
    };
    await updateUserFetch(requestBody);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <UserIconForm setFile={setFile} />
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" {...register("displayName")} />
      </div>

      <div className="space-y-3 sm:flex sm:justify-between sm:items-center sm:space-y-0">
        <ResetPassword />
        <Button className="block" variant="default">
          Save account
        </Button>
      </div>
    </form>
  );
}

export default AccountForm;
