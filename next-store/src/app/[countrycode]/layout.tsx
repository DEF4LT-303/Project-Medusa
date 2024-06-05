"use client";

import { QueryClient } from "@tanstack/react-query";
import { MedusaProvider } from "medusa-react";

const queryClient = new QueryClient();
const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL as string;

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <MedusaProvider
        queryClientProviderProps={{ client: queryClient }}
        baseUrl={backendUrl}
      >
        {children}
      </MedusaProvider>
    </section>
  );
}
