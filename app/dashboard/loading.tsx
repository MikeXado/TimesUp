import React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2">
      Loading...
    </div>
  );
}
