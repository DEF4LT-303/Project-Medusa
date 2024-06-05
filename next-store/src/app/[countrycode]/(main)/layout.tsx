import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import { getCustomer } from "@/lib/data";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer().catch(() => null);

  return (
    <section>
      <Navbar customer={customer} />
      {children}
      <Footer />
    </section>
  );
}
