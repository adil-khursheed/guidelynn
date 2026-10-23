const FALLBACK_URL = "https://guidelynn.vercel.app";

function normalizeUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normalizeUrl(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return normalizeUrl(vercel);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (apiUrl && !/localhost|127\.0\.0\.1/.test(apiUrl)) return normalizeUrl(apiUrl);

  return FALLBACK_URL;
}

export const siteConfig = {
  name: "Guidelynn",
  url: resolveSiteUrl(),
  title: "Guidelynn — Career counseling that remembers",
  description:
    "Guidelynn is an AI career counselor that starts from your profile and your previous conversations, then helps you leave with one clearer next move.",
  locale: "en_US",
  category: "education",
  keywords: [
    "career counseling",
    "AI career counselor",
    "career guidance",
    "career advice for students",
    "first job guidance",
    "career change",
    "early career",
  ],
} as const;
