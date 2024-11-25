import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import NextSessionProvider from "@/providers/nextSession";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { montserrat400 } from "./fonts/montserrat";
import ReactQueryProviders from "@/providers/reactQueryProvider";
import { Toaster } from "sonner";
import RecoilProvider from "@/providers/recoilProvider";



export const metadata: Metadata = {
  title: "MetaCL",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <RecoilProvider>
        <NextSessionProvider session={session}>
          <ReactQueryProviders>
            <body
              className={`${montserrat400.className} min-h-screen overflow-hidden relative antialiased`}
            >
              {children}
              <Toaster />
            </body>
          </ReactQueryProviders>
        </NextSessionProvider>
      </RecoilProvider>
    </html>
  );
}
