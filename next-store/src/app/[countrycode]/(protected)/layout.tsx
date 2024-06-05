import { getCustomer } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer().catch(() => null);

  if (!customer) {
    redirect("/");
  }

  return <section>{children}</section>;
}
