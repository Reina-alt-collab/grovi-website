/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://grovi.net',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}