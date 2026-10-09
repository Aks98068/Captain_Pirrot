import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Public site chrome. The /admin area lives outside this group so it has no header/footer.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
