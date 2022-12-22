import Head from "next/head";
import PageGenerator from "../generator/PageGenerator";

const Page = ({ data, params, breadcrumbs }) => {
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
      </Head>
      <PageGenerator data={data} params={params} breadcrumbs={breadcrumbs} />;
    </>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const { routes } = params;
  const requestParams = {};
  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
  ];
  if (routes.length === 1) {
    const [route] = routes;
    if (/^\d+$/.test(route)) {
      requestParams.type = "zip";
      requestParams.zip = route;
      breadcrumbs.push({
        href: `/${route}`,
        name: route,
      });
    } else if (/^([a-z0-9]*)(-[a-z0-9]+)*$/.test(route)) {
      requestParams.type = "service";
      requestParams.service = route;
      breadcrumbs.push({
        href: `/${route}`,
        name: route
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
      });
    } else {
      return {
        notFound: true,
      };
    }
  } else if (
    routes.length === 2 &&
    /^\d+$/.test(routes[0]) &&
    /^([a-z0-9]*)(-[a-z0-9]+)*$/.test(routes[1])
  ) {
    const [zip, service] = routes;
    requestParams.type = "zip";
    requestParams.zip = zip;
    requestParams.service = service;
    breadcrumbs.push({
      href: `/${zip}`,
      name: zip,
    });
    breadcrumbs.push({
      href: `/${zip}/${service}`,
      name: service
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
    });
  } else {
    // res.setHeader("Location", "/");
    // res.statusCode = 404;
    // res.end();
    return {
      notFound: true,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}?${new URLSearchParams({
        domain: process.env.BASE_URL,
        ...requestParams,
      }).toString()}`
    );

    const data = await response.json();

    if (!data || !!data.response) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
        params,
        breadcrumbs,
      },
    };
  } catch (err) {
    // res.setHeader("Location", "/");
    // res.statusCode = 404;
    // res.end();
    return {
      notFound: true,
    };
  }
};

export default Page;
