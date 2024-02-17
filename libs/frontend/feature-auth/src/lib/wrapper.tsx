import React from 'react';
import Link from 'next/link';
import { Command } from 'lucide-react';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute loga inset-0" />
        <div className="relative z-20 flex items-center text-black text-lg font-medium">
          <Command className="mr-2 h-6 w-6" /> Times Up
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This time management dashboard has saved me countless hours
              of work and helped me deliver stunning products to my clients
              faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Gurin Mihail</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}
