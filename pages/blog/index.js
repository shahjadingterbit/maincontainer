import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../../components/common";
import { Footer } from "../../components/containers";
import Breadcrumbs from "../../components/containers/Breadcrumbs";
import Navbar from "../../components/containers/Navbar";

const Page = ({ data, blogs, breadcrumbs, BASE_URL }) => {
  return (
    <div className="flex flex-col items-center">
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
        <link rel="canonical" href={`${BASE_URL}/blog`} />

        {Object.entries(data.header?.schemas[0]).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/blog`)
                  .replaceAll("[phone]", data.contact.phone),
              }}
            />
          );
        })}
      </Head>
      <Container className="bg-blue-50 py-12">
        <div className="lg:w-9/12 w-10/12 flex text-center flex-col items-center text-gray-700">
          <Navbar
            services={data.allServices}
            contact={data.contact}
            header={data.header}
          />
        </div>
      </Container>
      <Breadcrumbs items={breadcrumbs} />
      <section className="w-10/12 lg:w-8/12 flex flex-col items-center mb-20">
        <h2 className="text-4xl font-bold text-center my-10 text-primary">
          Blog
        </h2>
        <div className="w-full flex flex-col items-center">
          {blogs.map((item, index) => (
            <div
              key={index}
              className="grid lg:grid-cols-blog gap-5 lg:gap-7 w-full mb-10 lg:mb-8"
            >
              <Link
                href={`/blog/${item.href.split(/[\n|\r|?]/).join("")}`}
                className="overflow-hidden rounded-md"
              >
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="bg-cover bg-center w-full h-[200px] p-20 hover:scale-110 transition-all"
                ></div>
              </Link>
              <div className="space-y-2 lg:space-y-3 flex flex-col lg:block">
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}
                </p>
                <p className="text-gray-500">
                  {item.description.slice(0, 180)}...
                </p>
                <Link href={`/blog/${item.href.split(/[\n|\r|?]/).join("")}`}>
                  <button className="btnPrimary mt-3 lg:mt-5 text-sm">Read Blog</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer
        data={data.footer}
        contact={data.contact}
        brand={data.header.navbar.brand}
      />
    </div>
  );
};

export async function getServerSideProps() {
  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];

  const response = await fetch(
    `${process.env.BASE_URL}?${new URLSearchParams({
      domain: process.env.BASE_URL,
    }).toString()}`
  );

  const data = await response.json();

  const blogsres = await fetch(
    `https://apicms.ecommcube.com/api/blog?${new URLSearchParams({
      domain: process.env.BASE_URL,
    }).toString()}`
  );

  const blogs = await blogsres.json();

  return {
    props: {
      data,
      blogs,
      breadcrumbs,
      BASE_URL: process.env.BASE_URL,
    },
  };
}

export default Page;
