import React, { useEffect, useCallback } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/models/firebase-client";

function GoogleButton({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (prev: boolean) => void;
}) {
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const tkn = await result.user.getIdToken();
      const res = await fetch("/api/v1/auth/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tkn: tkn }),
      });

      const messageData = await res.json();
      if (res.status === 200) {
        router.push("/dashboard");
        toast({
          title: "Success",
          description: messageData.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: messageData.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          "Something went wrong during google login process. Try again later",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router, setIsLoading]);

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  return (
    <Button
      onClick={onSubmit}
      variant="outline"
      className="flex items-center space-x-2"
      type="button"
      disabled={isLoading}
    >
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill="#4285F4"
            d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
          ></path>
          <path
            fill="#34A853"
            d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
          ></path>
          <path
            fill="#FBBC04"
            d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
          ></path>
          <path
            fill="#EA4335"
            d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
          ></path>
        </g>
      </svg>
      <span>Google</span>
    </Button>
  );
}

export default GoogleButton;
