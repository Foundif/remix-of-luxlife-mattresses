import mattressLuxury from "@/assets/mattress-luxury.jpg";
import mattressOrtho from "@/assets/mattress-ortho.jpg";
import mattressCooling from "@/assets/mattress-cooling.jpg";
import mattressSpring from "@/assets/mattress-spring.jpg";
import mattressLatex from "@/assets/mattress-latex.jpg";
import mattressKids from "@/assets/mattress-kids.jpg";

export const media = {
  heroAthlete: mattressLuxury,
  macroFabric: mattressCooling,
  storyMove: mattressLatex,
  collectionLifestyle: mattressLuxury,
  catSports: mattressOrtho,
  catEveryday: mattressSpring,
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

const mattressSizes = ["Single", "Double", "Queen", "King"];

export const products: Product[] = [
  { id: "lux-01", name: "CloudRest Memory Foam", category: "Memory Foam", activity: "Medium Soft", price: 12999, mrp: 18999, rating: 4.9, reviews: 386, image: mattressLuxury, hoverImage: mattressCooling, badge: "BESTSELLER", colors: ["Medium Soft", "Medium"], sizes: mattressSizes },
  { id: "lux-02", name: "OrthoAlign Support", category: "Orthopedic", activity: "Firm", price: 14999, mrp: 21999, rating: 4.8, reviews: 274, image: mattressOrtho, hoverImage: mattressLuxury, badge: "BESTSELLER", colors: ["Medium Firm", "Firm"], sizes: mattressSizes },
  { id: "lux-03", name: "BreezeGel Cooling", category: "Memory Foam", activity: "Medium", price: 17999, mrp: 24999, rating: 4.7, reviews: 196, image: mattressCooling, hoverImage: mattressSpring, badge: "NEW", colors: ["Medium", "Medium Firm"], sizes: mattressSizes },
  { id: "lux-04", name: "Royal Pocket Spring", category: "Pocket Spring", activity: "Medium Firm", price: 22999, mrp: 31999, rating: 4.9, reviews: 148, image: mattressSpring, hoverImage: mattressLuxury, badge: "NEW", colors: ["Medium Firm"], sizes: mattressSizes },
  { id: "lux-05", name: "NaturePure Latex", category: "Latex", activity: "Medium Firm", price: 26999, mrp: 36999, rating: 4.8, reviews: 112, image: mattressLatex, hoverImage: mattressCooling, badge: "NEW", colors: ["Medium", "Medium Firm"], sizes: mattressSizes },
  { id: "lux-06", name: "Junior Dream Mattress", category: "Kids", activity: "Medium Soft", price: 8999, mrp: 12999, rating: 4.7, reviews: 89, image: mattressKids, hoverImage: mattressLatex, colors: ["Medium Soft"], sizes: ["Single", "Double"] },
  { id: "lux-07", name: "SpineCare Ortho Plus", category: "Orthopedic", activity: "Extra Firm", price: 18999, mrp: 25999, rating: 4.9, reviews: 231, image: mattressOrtho, hoverImage: mattressSpring, badge: "BESTSELLER", colors: ["Firm", "Extra Firm"], sizes: mattressSizes },
  { id: "lux-08", name: "Serene Hybrid Luxe", category: "Hybrid", activity: "Medium Firm", price: 29999, mrp: 41999, rating: 4.8, reviews: 174, image: mattressLuxury, hoverImage: mattressSpring, badge: "NEW", colors: ["Medium Firm"], sizes: mattressSizes },
  { id: "lux-09", name: "EcoFlex Natural Latex", category: "Latex", activity: "Medium", price: 23999, mrp: 32999, rating: 4.7, reviews: 96, image: mattressLatex, hoverImage: mattressLuxury, colors: ["Medium", "Medium Firm"], sizes: mattressSizes },
  { id: "lux-10", name: "CoolTouch Comfort", category: "Cooling", activity: "Medium Soft", price: 15999, mrp: 22999, rating: 4.6, reviews: 157, image: mattressCooling, hoverImage: mattressOrtho, colors: ["Medium Soft", "Medium"], sizes: mattressSizes },
  { id: "lux-11", name: "Classic Bonnell Spring", category: "Spring", activity: "Firm", price: 10999, mrp: 15999, rating: 4.6, reviews: 205, image: mattressSpring, hoverImage: mattressOrtho, badge: "LOW STOCK", colors: ["Firm"], sizes: mattressSizes },
  { id: "lux-12", name: "Grand Hotel Pillow Top", category: "Luxury", activity: "Plush", price: 34999, mrp: 48999, rating: 4.9, reviews: 127, image: mattressLuxury, hoverImage: mattressLatex, badge: "BESTSELLER", colors: ["Plush", "Medium Soft"], sizes: mattressSizes },
];

export const categories = [
  { name: "Memory Foam", count: 12, image: mattressCooling },
  { name: "Orthopedic", count: 9, image: mattressOrtho },
  { name: "Pocket Spring", count: 8, image: mattressSpring },
  { name: "Natural Latex", count: 6, image: mattressLatex },
];

export const activities = ["Memory Foam", "Orthopedic", "Pocket Spring", "Latex", "Hybrid"];