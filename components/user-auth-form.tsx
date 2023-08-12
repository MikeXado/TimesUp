"use client";

import * as React from "react";
import { cn, usePRouter } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "./ui/use-toast";
import GoogleButton from "./ui/google-button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

export function UserAuthForm({ type, className, ...props }: UserAuthFormProps) {
  const router = usePRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const url = type === "signUp" ? "/api/v1/auth/signUp" : "/api/v1/auth/signIn";

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(
    async (data) => {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const messageData = await res.json();
      if (res.ok) {
        if (type === "signUp") {
          router.push("/signIn");
        } else if (type === "signIn") {
          router.push("/dashboard");
        }
        toast({
          title: "Success",
          description: messageData.message,
        });
        setIsLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: messageData.message,
        });
        setIsLoading(false);
      }
    },
    [router, setIsLoading, type, url]
  );

  const renderSubmitButton = () => {
    if (isLoading) {
      return "Authorization...";
    }

    return type === "signUp" ? "Sign Up" : "Sign In";
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {type === "signUp" && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                placeholder="username"
                type="text"
                disabled={isLoading}
                {...register("displayName", { required: true })}
              />
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              disabled={isLoading}
              {...register("email", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              disabled={isLoading}
              {...register("password", { required: true })}
            />
          </div>
          <Button disabled={isLoading}>{renderSubmitButton()}</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleButton isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}
