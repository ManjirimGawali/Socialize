"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "react-hot-toast";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen">
          <Navbar />

          <main className="py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="hidden lg:block lg:col-span-3">
                  <Sidebar />
                </div>

                <div className="lg:col-span-9">{children}</div>
              </div>
            </div>
          </main>
        </div>

        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  );
}