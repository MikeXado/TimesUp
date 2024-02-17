import './globals.css';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';
import { NProgressTop, Toaster } from '@timesup/frontend/ui';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TimesUp',
  description: 'A app for time management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NProgressTop>
            <NextTopLoader color="#4db223" height={5} showSpinner={false} />
            {children}
            <Toaster />
          </NProgressTop>
        </body>
      </html>
    </ClerkProvider>
  );
}
