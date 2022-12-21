import Head from "next/head";
import Link from "next/link";

const _404 = ({ data }) => {
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
      <div className="flex items-center space-y-8 justify-center w-full h-screen flex-col">
        <h1 className="font-bold text-9xl">🤖</h1>
        <h2 className="font-bold text-4xl lg:text-8xl text-red-400">
          404 <span className="text-gray-500">Page not found</span>
        </h2>
        <Link href="/" className="text-lg underline hover:text-red-400">
          Return back to home
        </Link>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.BASE_URL}?${new URLSearchParams({
      domain: process.env.BASE_URL,
    }).toString()}`
  );

  const data = await response.json();

  return {
    props: { data },
  };
};

export default _404;
