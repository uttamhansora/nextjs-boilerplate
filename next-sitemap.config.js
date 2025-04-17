const siteUrl = process.env.FRONTEND_URL;
module.exports = {
  siteUrl ,
  exclude: ["/404", "/server-sitemap.xml"],
  generateRobotsTxt: true,
  changefreq : 'weekly',
  priority  : 0.9,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
    ],
  },
};