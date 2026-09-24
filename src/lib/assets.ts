// src/lib/assets.ts
const CDN_ORIGIN = "https://luxlifematresses.lovable.app";

export function resolveAssetUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/__l5e/")) {
    return `${CDN_ORIGIN}${url}`;
  }
  return url;
}
