'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import * as NProgress from 'nprogress';
export function NProgressTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return <div>{children}</div>;
}
