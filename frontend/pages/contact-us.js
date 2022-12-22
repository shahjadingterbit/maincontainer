import Head from "next/head";
import PageGenerator from "../generator/PageGenerator";

export default function Page({ data, breadcrumbs, BASE_URL }) {
  return (
    <>
      <Head>
        <title>{data.header.meta.title}</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#fffff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={data.header.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="canonical" href={`${BASE_URL}/contact-us`} />

        {Object.entries(data.header?.schemas[0]).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/contact-us`)
                  .replaceAll("[phone]", data.contact.phone),
              }}
            />
          );
        })}
      </Head>
      <PageGenerator
        data={data}
        breadcrumbs={breadcrumbs}
        type="contact-us"
        BASE_URL={BASE_URL}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const homeRes = await fetch(
    `${process.env.BASE_URL}?${new URLSearchParams({
      domain: process.env.BASE_URL,
    }).toString()}`
  );

  const homeData = await homeRes.json();

  const response = await fetch(
    `${process.env.BASE_URL}?${new URLSearchParams({
      domain: process.env.BASE_URL,
      type: "contact",
    }).toString()}`
  );

  const data = await response.json();

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Contact",
      href: `/contact-us`,
    },
  ];

  return {
    props: {
      data: { ...homeData, contact: data.contact },
      breadcrumbs,
      BASE_URL: process.env.BASE_URL,
    },
  };
};
