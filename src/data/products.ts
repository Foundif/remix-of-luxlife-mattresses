import heroAthlete from "@/assets/hero-athlete.jpg";
import macroFabric from "@/assets/macro-fabric.jpg";
import storyMove from "@/assets/story-move.jpg";
import collectionLifestyle from "@/assets/collection-lifestyle.jpg";
import catSports from "@/assets/cat-sports.jpg";
import catEveryday from "@/assets/cat-everyday.jpg";

export const media = {
  heroAthlete,
  macroFabric,
  storyMove,
  collectionLifestyle,
  catSports,
  catEveryday,
};

export type Product = {
  id: string;
  name: string;
  category: string;
  activity: string;
  price: number;
  mrp?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  badge?: "NEW" | "BESTSELLER" | "LOW STOCK";
  colors: string[];
  sizes: string[];
};

const inr = (n: number) => n;

export const products: Product[] = [
  {
    id: "krx-01",
    name: "Kinetic Crew — Ribbed",
    category: "Unisex",
    activity: "Everyday",
    price: inr(699),
    mrp: 899,
    rating: 4.8,
    reviews: 412,
    image: collectionLifestyle,
    hoverImage: macroFabric,
    badge: "BESTSELLER",
    colors: ["Bone", "Ink", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "krx-02",
    name: "Pace Ankle — Performance",
    category: "Sports",
    activity: "Running",
    price: inr(549),
    mrp: 749,
    rating: 4.7,
    reviews: 288,
    image: catEveryday,
    hoverImage: collectionLifestyle,
    badge: "NEW",
    colors: ["White", "Grey"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "krx-03",
    name: "Grip Trainer — Cushioned",
    category: "Sports",
    activity: "Gym",
    price: inr(799),
    rating: 4.9,
    reviews: 176,
    image: catSports,
    hoverImage: macroFabric,
    badge: "LOW STOCK",
    colors: ["Ink", "Charcoal"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: "krx-04",
    name: "Everyday No-Show — 3 Pack",
    category: "Unisex",
    activity: "Lifestyle",
    price: inr(1299),
    mrp: 1797,
    rating: 4.6,
    reviews: 934,
    image: catEveryday,
    hoverImage: catSports,
    colors: ["Bone", "Grey", "Ink"],
    sizes: ["S", "M", "L", "XL"],
  },
];

export const categories = [
  { name: "Unisex", count: 32, image: collectionLifestyle },
  { name: "Sports", count: 24, image: catSports },
  { name: "Men", count: 28, image: heroAthlete },
  { name: "Women", count: 21, image: storyMove },
];

export const activities = ["Sports", "Running", "Gym", "Lifestyle", "Everyday"];
