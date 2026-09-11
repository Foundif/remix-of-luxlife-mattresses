import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const productColumns =
  "id, slug, name, category_name, activity, description, price, mrp, rating, reviews_count, stock, badge, colors, sizes, image, hover_image, is_new, is_featured, sort_order";

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("products")
    .select(productColumns)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data ?? [];
});

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("categories")
    .select("id, slug, name, description, image, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data ?? [];
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data: { slug } }) => {
    const supabase = publicClient();
    const { data: product } = await supabase
      .from("products")
      .select(productColumns)
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    if (!product) return null;
    const { data: reviews } = await supabase
      .from("reviews")
      .select("id, author_name, city, rating, body, created_at")
      .eq("product_id", product.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    return { product, reviews: reviews ?? [] };
  });

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient().from("site_content").select("key, data");
  return (data ?? []) as { key: string; data: unknown }[];
});

