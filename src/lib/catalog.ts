import { queryOptions } from "@tanstack/react-query";
import type { Product } from "@/data/products";
import { media } from "@/data/products";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import heroLoop2 from "@/assets/hero-loop-2.mp4.asset.json";
import heroLoop3 from "@/assets/hero-loop-3.mp4.asset.json";
import {
  getProductBySlug,
  getSiteContent,
  listCategories,
  listProducts,
} from "@/lib/catalog.functions";

const videoMap: Record<string, string> = {
  heroLoop: heroLoop.url,
  heroLoop2: heroLoop2.url,
  heroLoop3: heroLoop3.url,
};

/** Resolves a stored image reference: a bundled asset key, or any URL/path. */
export function imageSrc(ref: string | null | undefined): string {
  if (!ref) return media.collectionLifestyle;
  if (ref.startsWith("http") || ref.startsWith("/") || ref.startsWith("data:")) return ref;
  return (media as Record<string, string>)[ref] ?? media.collectionLifestyle;
}

export function videoSrc(ref: string | null | undefined): string {
  if (!ref) return heroLoop.url;
  if (ref.startsWith("http") || ref.startsWith("/")) return ref;
  return videoMap[ref] ?? heroLoop.url;
}

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category_name: string;
  activity: string;
  description: string;
  price: number;
  mrp: number | null;
  rating: number;
  reviews_count: number;
  stock: number;
  badge: string | null;
  colors: string[];
  sizes: string[];
  image: string;
  hover_image: string;
  is_new: boolean;
  is_featured: boolean;
  sort_order: number;
};

export type ReviewRow = {
  id: string;
  author_name: string;
  city: string;
  rating: number;
  body: string;
  created_at: string;
};

export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sort_order: number;
};

export type CatalogProduct = Product & { stock: number; description: string; slug: string };

export function toProduct(row: ProductRow): CatalogProduct {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    category: row.category_name,
    activity: row.activity,
    description: row.description,
    price: row.price,
    ...(row.mrp ? { mrp: row.mrp } : {}),
    rating: Number(row.rating),
    reviews: row.reviews_count,
    stock: row.stock,
    image: imageSrc(row.image),
    hoverImage: imageSrc(row.hover_image),
    ...(row.badge ? { badge: row.badge as NonNullable<Product["badge"]> } : {}),
    colors: row.colors.length > 0 ? row.colors : ["Ink"],
    sizes: row.sizes.length > 0 ? row.sizes : ["S", "M", "L"],
  } as CatalogProduct;
}


export const productsQuery = queryOptions({
  queryKey: ["catalog", "products"],
  queryFn: async () => ((await listProducts()) as unknown as ProductRow[]).map(toProduct),
  staleTime: 60_000,
});

export const categoriesQuery = queryOptions({
  queryKey: ["catalog", "categories"],
  queryFn: async () => (await listCategories()) as unknown as CategoryRow[],
  staleTime: 60_000,
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["catalog", "product", slug],
    queryFn: async () => {
      const result = (await getProductBySlug({ data: { slug } })) as unknown as {
        product: ProductRow;
        reviews: ReviewRow[];
      } | null;
      if (!result) return null;
      return { product: toProduct(result.product), reviews: result.reviews };
    },
    staleTime: 60_000,
  });

export type HeroSlide = {
  video?: string;
  eyebrow?: string;
  headline?: string;
  copy?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export type SiteContent = {
  hero?: { slides?: HeroSlide[] };
  rail?: { eyebrow?: string; title?: string; subtitle?: string };
  offer?: { eyebrow?: string; title?: string; copy?: string; ctaLabel?: string; ctaTo?: string };
};

export const siteContentQuery = queryOptions({
  queryKey: ["catalog", "site-content"],
  queryFn: async () => (await getSiteContent()) as SiteContent,
  staleTime: 60_000,
});
