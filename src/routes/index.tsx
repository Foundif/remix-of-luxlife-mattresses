import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { NoticeBar } from "@/components/site/NoticeBar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { BestSellersGrid, NewThisWeek } from "@/components/site/HomeShop";
import { OfferBanner, ShopByCategory } from "@/components/site/HomeSections";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { AnatomySection } from "@/components/site/Anatomysection";

const title = "Luxlife Mattresses — Sleep Better, Live Better";
const description =
  "Premium memory foam, orthopedic, spring, latex and hybrid mattresses manufactured in Salem for deeper, healthier sleep.";

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
        <AnatomySection />
        <ShopByCategory />
        <TestimonialsCarousel />
        <OfferBanner />
      </main>
      <Footer />
    </>
  );
}
