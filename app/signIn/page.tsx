import Link from "next/link";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/user-auth-form";

export default function SingnIn() {
  return (
    <>
      <div className="container relative md:h-screen md:pb-0 pb-5 h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signUp"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          Sign Up
        </Link>
        <div className=" relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute loga inset-0" />
          <div className="relative z-20 flex items-center text-black text-lg font-medium">
            <Command className="mr-2 h-6 w-6 " /> Times Up
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This time management dashboard has saved me countless
                hours of work and helped me deliver stunning products to my
                clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Gurin Mihail</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full  pt-32  flex-col justify-center space-y-6 sm:w-[350px] md:pt-0 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your account credentials to access dashboard
              </p>
            </div>
            <UserAuthForm type="signIn" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
