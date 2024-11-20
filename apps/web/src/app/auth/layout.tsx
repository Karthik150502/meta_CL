import type { Metadata } from "next";
import { montserrat400 } from "../fonts/montserrat";
import { Toaster } from "@/components/ui/sonner";
import AppProviders from "@/providers";


export const metadata: Metadata = {
    title: "Metacl | Auth",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppProviders>
            <main
                className={`${montserrat400.className} min-h-screen overflow-hidden relative antialiased`}
            >
                {children}
                <Toaster />
            </main>
        </AppProviders>
    );
}
