const { writeFileSync } = require('fs');

const DOMAIN = 'https://vhereyga.vercel.app/';
const date = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

writeFileSync('./sitemap.xml', sitemap);
console.log('✅ sitemap.xml generated!');
