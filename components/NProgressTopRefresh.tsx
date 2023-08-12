"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import * as NProgress from "nprogress";
function NProgressTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default NProgressTop;
