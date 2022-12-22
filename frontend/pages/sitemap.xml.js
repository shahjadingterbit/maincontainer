import { getSitemaps } from "../sitemap-api";

const Sitemap = () => {};

const baseUrl = process.env.BASE_URL;

export const getServerSideProps = async ({ res }) => {
  const sitemaps = await getSitemaps();

  const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl" ?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap, index) => `
        <sitemap>
          <loc>${baseUrl}/sitemaps/${index + 1}</loc>
          <lastmod>${new Date()}</lastmod>
        </sitemap>
      `
    )
    .join("")}
  </sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapindex);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
