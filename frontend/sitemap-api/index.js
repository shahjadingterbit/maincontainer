const baseUrl = process.env.BASE_URL;

const withBaseUrl = (relativeUrl) =>
  `${baseUrl}${
    !!relativeUrl
      ? relativeUrl.startsWith("/")
        ? relativeUrl
        : `/${relativeUrl}`
      : ""
  }`;

export async function getSitemaps() {
  const response = await fetch(
    `${process.env.BASE_URL}?${new URLSearchParams({
      domain: process.env.BASE_URL,
    }).toString()}`
  );

  const data = await response.json();

  const images = [
    data.header.backgroundImage.src,
    ...data.header.sitemapImages[0].home.map((item) => withBaseUrl(item)),
    data.contact.backgroundImage.src,
    ...data.ourServices.items.map((item) => item.backgroundImage.src),
    data.footer.services.backgroundImage.src,
  ];

  const urls = [
    ...data.header.navbar.items
      .filter((item) => !item.href.endsWith("#"))
      .map((item) => ({
        loc: withBaseUrl(item.href),
        images,
        lastmod: new Date(),
      })),
    ...data.zips.items.map((item) => ({
      loc: withBaseUrl(`towing-los-angeles-ca${item.path}`),
      images,
      lastmod: new Date(),
    })),
    ...data.allServices.items.map((item) => ({
      loc: withBaseUrl(`${item.path}-los-angeles-ca`),
      images,
      lastmod: new Date(),
    })),
    ...data.allServices.items.reduce(
      (prev, service) => [
        ...prev,
        ...data.zips.items.map((item) => ({
          loc: withBaseUrl(`${service.path}-los-angeles-ca${item.path}`),
          images,
          lastmod: new Date(),
        })),
      ],
      []
    ),
  ];

  const sitemaps = [];

  while (urls.length) {
    sitemaps.push(urls.splice(0, 200));
  }

  return sitemaps;
}
