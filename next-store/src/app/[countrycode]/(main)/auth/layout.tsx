import { getCustomer } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer().catch(() => null);

  if (!customer) {
    return <div>{children}</div>;
  } else {
    redirect("/");
  }
}
