/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Canonical site for sitemap + robots Sitemap: line. Set per deploy, e.g.
  // NEXT_PUBLIC_SITE_URL=https://your-pharmacy.example pnpm build
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://belvederepharmacy.net",
  generateRobotsTxt: true,
  exclude: ["/icon.png"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
    // next-sitemap always adds a Yandex-style Host line from siteUrl; Google ignores it.
    // Omit it to avoid implying a single host when you ship multiple tenant domains.
    transformRobotsTxt: async (_, robotsTxt) =>
      robotsTxt.replace(/\r?\n# Host\r?\nHost:[^\r\n]+\r?\n?/, "\n"),
  },
};
