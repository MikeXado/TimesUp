import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import NProgressTopRefresh from "@/components/NProgressTopRefresh";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TimesUp",
  description: "A app for time management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NProgressTopRefresh>
          <NextTopLoader color="#4db223" height={5} />
          {children}
          <Toaster />
        </NProgressTopRefresh>
      </body>
    </html>
  );
}
