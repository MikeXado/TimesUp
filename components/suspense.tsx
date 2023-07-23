import React, { Suspense } from "react";
import Spinner from "./ui/spinner";

function SuspenseFallback({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full h-full justify-center items-center">
          <Spinner
            fillColorThumb="fill-green-500"
            fillColorTrack="text-gray-300"
            width="w-10"
            height="h-10"
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseFallback;
