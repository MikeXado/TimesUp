"use client";

import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spinner />
    </div>
  );
}
