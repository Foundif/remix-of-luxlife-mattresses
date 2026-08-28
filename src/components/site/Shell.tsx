import type { ReactNode } from "react";
import { NoticeBar } from "@/components/site/NoticeBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <NoticeBar />
      <Header solid />
      <main className="min-h-[70svh] bg-background">{children}</main>
      <Footer />
    </>
  );
}
