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

export type ProductVariantPrice = {
  dimension: string; // e.g. "75 X 36"
  label: string; // e.g. "Single (75 X 36)"
  widthInches: number;
  prices: Record<string, number>; // thickness key -> price
};

export type Product = {
  id: string;
  name: string;
  category: "Spring Mattress" | "Aurosoft Foam" | "Hybrid Eco";
  activity: string; // Comfort feel
  subtitle: string;
  price: number; // Starting price
  mrp?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  badge?: "NEW" | "BESTSELLER" | "LOW STOCK";
  colors: string[];
  sizes: string[];
  thicknesses: string[];
  priceMatrix: ProductVariantPrice[];
};

export const doubleSideQuiltPricing = [
  { maxWidth: 48, label: 'Up to 48" Width', price: 800 },
  { maxWidth: 60, label: '60" Width', price: 1100 },
  { maxWidth: 72, label: '72" Width', price: 1300 },
  { maxWidth: 999, label: "Custom / Unsize", price: 1600 },
];

export const products: Product[] = [
  {
    id: "lux-spinocore",
    name: "Spinocore Spring Mattress",
    category: "Spring Mattress",
    activity: "Medium Firm",
    subtitle: '6" Innerspring Core with Premium Knitted Quilt',
    price: 9000,
    mrp: 12500,
    rating: 4.9,
    reviews: 248,
    image: mattressSpring,
    hoverImage: mattressLuxury,
    badge: "BESTSELLER",
    colors: ["Classic White Quilt", "Granite Grey Trim"],
    sizes: ["75 X 36", "75 X 48", "75 X 60", "78 X 60", "75 X 72", "78 X 72", "84 X 60", "84 X 72"],
    thicknesses: ['6" (Spinocore)'],
    priceMatrix: [
      { dimension: "75 X 36", label: "Single (75 X 36)", widthInches: 36, prices: { '6" (Spinocore)': 9000 } },
      { dimension: "75 X 48", label: "Double (75 X 48)", widthInches: 48, prices: { '6" (Spinocore)': 12000 } },
      { dimension: "75 X 60", label: "Queen (75 X 60)", widthInches: 60, prices: { '6" (Spinocore)': 15000 } },
      { dimension: "78 X 60", label: "Queen XL (78 X 60)", widthInches: 60, prices: { '6" (Spinocore)': 15600 } },
      { dimension: "75 X 72", label: "King (75 X 72)", widthInches: 72, prices: { '6" (Spinocore)': 18000 } },
      { dimension: "78 X 72", label: "King XL (78 X 72)", widthInches: 72, prices: { '6" (Spinocore)': 18720 } },
      { dimension: "84 X 60", label: "Grand Queen (84 X 60)", widthInches: 60, prices: { '6" (Spinocore)': 16800 } },
      { dimension: "84 X 72", label: "Grand King (84 X 72)", widthInches: 72, prices: { '6" (Spinocore)': 20160 } },
    ],
  },
  {
    id: "lux-zenluxe",
    name: "Zenluxe Euro Top Spring Mattress",
    category: "Spring Mattress",
    activity: "Plush Medium",
    subtitle: '8" Euro Top (ET) Luxury Pocket Spring with Knitted Quilt',
    price: 10680,
    mrp: 15500,
    rating: 4.9,
    reviews: 184,
    image: mattressLuxury,
    hoverImage: mattressSpring,
    badge: "BESTSELLER",
    colors: ["Ivory Euro Top", "Dark Grey Edge"],
    sizes: ["75 X 36", "75 X 48", "75 X 60", "78 X 60", "75 X 72", "78 X 72", "84 X 60", "84 X 72"],
    thicknesses: ['8" ET (Zenluxe)'],
    priceMatrix: [
      { dimension: "75 X 36", label: "Single (75 X 36)", widthInches: 36, prices: { '8" ET (Zenluxe)': 10680 } },
      { dimension: "75 X 48", label: "Double (75 X 48)", widthInches: 48, prices: { '8" ET (Zenluxe)': 14240 } },
      { dimension: "75 X 60", label: "Queen (75 X 60)", widthInches: 60, prices: { '8" ET (Zenluxe)': 17800 } },
      { dimension: "78 X 60", label: "Queen XL (78 X 60)", widthInches: 60, prices: { '8" ET (Zenluxe)': 18512 } },
      { dimension: "75 X 72", label: "King (75 X 72)", widthInches: 72, prices: { '8" ET (Zenluxe)': 21360 } },
      { dimension: "78 X 72", label: "King XL (78 X 72)", widthInches: 72, prices: { '8" ET (Zenluxe)': 22214 } },
      { dimension: "84 X 60", label: "Grand Queen (84 X 60)", widthInches: 60, prices: { '8" ET (Zenluxe)': 19936 } },
      { dimension: "84 X 72", label: "Grand King (84 X 72)", widthInches: 72, prices: { '8" ET (Zenluxe)': 23923 } },
    ],
  },
  {
    id: "lux-aurosoft",
    name: "Aurosoft High-Resilience Foam Mattress",
    category: "Aurosoft Foam",
    activity: "Medium Soft to Firm",
    subtitle: 'Adaptive Pressure Relieving Foam with Knitted Quilt (4", 5", 6", 8")',
    price: 6645,
    mrp: 9500,
    rating: 4.8,
    reviews: 312,
    image: mattressCooling,
    hoverImage: mattressOrtho,
    badge: "NEW",
    colors: ["Pure White Quilt", "Breathable Lime Mesh"],
    sizes: ["75 X 30", "75 X 36", "75 X 44", "75 X 48", "75 X 60", "75 X 72", "78 X 72", "84 X 66", "84 X 72"],
    thicknesses: ['4"', '5"', '6"', '8"'],
    priceMatrix: [
      {
        dimension: "75 X 30",
        label: "Cot (75 X 30)",
        widthInches: 30,
        prices: { '4"': 6645, '5"': 8306, '6"': 9967, '8"': 13290 },
      },
      {
        dimension: "75 X 36",
        label: "Single (75 X 36)",
        widthInches: 36,
        prices: { '4"': 7974, '5"': 9967, '6"': 11961, '8"': 15948 },
      },
      {
        dimension: "75 X 44",
        label: "Compact Double (75 X 44)",
        widthInches: 44,
        prices: { '4"': 9743, '5"': 12178, '6"': 14614, '8"': 19486 },
      },
      {
        dimension: "75 X 48",
        label: "Standard Double (75 X 48)",
        widthInches: 48,
        prices: { '4"': 10632, '5"': 13290, '6"': 15948, '8"': 21264 },
      },
      {
        dimension: "75 X 60",
        label: "Queen (75 X 60)",
        widthInches: 60,
        prices: { '4"': 13290, '5"': 16612, '6"': 19935, '8"': 26580 },
      },
      {
        dimension: "75 X 72",
        label: "King (75 X 72)",
        widthInches: 72,
        prices: { '4"': 15948, '5"': 19935, '6"': 23922, '8"': 31896 },
      },
      {
        dimension: "78 X 72",
        label: "King XL (78 X 72)",
        widthInches: 72,
        prices: { '4"': 16585, '5"': 20732, '6"': 24878, '8"': 33171 },
      },
      {
        dimension: "84 X 66",
        label: "Grand Queen (84 X 66)",
        widthInches: 66,
        prices: { '4"': 14884, '5"': 18606, '6"': 22327, '8"': 29769 },
      },
      {
        dimension: "84 X 72",
        label: "Grand King (84 X 72)",
        widthInches: 72,
        prices: { '4"': 17861, '5"': 22327, '6"': 26792, '8"': 35723 },
      },
    ],
  },
  {
    id: "lux-hybrid-eco",
    name: "Hybrid Eco Comfort Mattress",
    category: "Hybrid Eco",
    activity: "Medium",
    subtitle: 'Eco-Balanced Ergonomic Support with Knitted Quilt (4", 5", 6")',
    price: 4300,
    mrp: 6200,
    rating: 4.7,
    reviews: 156,
    image: mattressLatex,
    hoverImage: mattressKids,
    badge: "NEW",
    colors: ["Clean Eco Quilt", "Charcoal Border"],
    sizes: [
      "75 X 30",
      "75 X 36",
      "75 X 44",
      "75 X 48",
      "75 X 60",
      "78 X 60",
      "75 X 72",
      "78 X 72",
      "84 X 60",
      "84 X 72",
    ],
    thicknesses: ['4"', '5"', '6"'],
    priceMatrix: [
      { dimension: "75 X 30", label: "Cot (75 X 30)", widthInches: 30, prices: { '4"': 4300, '5"': 5732, '6"': 6450 } },
      {
        dimension: "75 X 36",
        label: "Single (75 X 36)",
        widthInches: 36,
        prices: { '4"': 5160, '5"': 6450, '6"': 7740 },
      },
      {
        dimension: "75 X 44",
        label: "Compact Double (75 X 44)",
        widthInches: 44,
        prices: { '4"': 6318, '5"': 7883, '6"': 9477 },
      },
      {
        dimension: "75 X 48",
        label: "Standard Double (75 X 48)",
        widthInches: 48,
        prices: { '4"': 6880, '5"': 8600, '6"': 10320 },
      },
      {
        dimension: "75 X 60",
        label: "Queen (75 X 60)",
        widthInches: 60,
        prices: { '4"': 8600, '5"': 10750, '6"': 12900 },
      },
      {
        dimension: "78 X 60",
        label: "Queen XL (78 X 60)",
        widthInches: 60,
        prices: { '4"': 8944, '5"': 11180, '6"': 13416 },
      },
      {
        dimension: "75 X 72",
        label: "King (75 X 72)",
        widthInches: 72,
        prices: { '4"': 10320, '5"': 12900, '6"': 15480 },
      },
      {
        dimension: "78 X 72",
        label: "King XL (78 X 72)",
        widthInches: 72,
        prices: { '4"': 10732, '5"': 13416, '6"': 16099 },
      },
      {
        dimension: "84 X 60",
        label: "Grand Queen (84 X 60)",
        widthInches: 60,
        prices: { '4"': 9632, '5"': 12040, '6"': 14448 },
      },
      {
        dimension: "84 X 72",
        label: "Grand King (84 X 72)",
        widthInches: 72,
        prices: { '4"': 11558, '5"': 14448, '6"': 17336 },
      },
    ],
  },
];

export const categories = [
  { name: "Spring Mattress", count: 2, image: mattressSpring },
  { name: "Aurosoft Foam", count: 1, image: mattressCooling },
  { name: "Hybrid Eco", count: 1, image: mattressLatex },
];

export const activities = ["Medium Soft", "Medium", "Medium Firm", "Plush Medium"];
