import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { NoticeBar } from "@/components/site/NoticeBar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { BestSellersGrid, NewThisWeek } from "@/components/site/HomeShop";
import { OfferBanner, ShopByCategory } from "@/components/site/HomeSections";



const title = "KRUX — Premium Performance Socks Built For Every Move";
const description =
  "Engineered performance and everyday socks: breathable knit zones, targeted cushioning and a fit that holds. Shop the 2026 collection.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <NoticeBar />
      <Header />
      <main>
        <Hero />
        <NewThisWeek />
        <BestSellersGrid />
        <ShopByCategory />
        <OfferBanner />
      </main>
      <Footer />
    </>

  );

}
