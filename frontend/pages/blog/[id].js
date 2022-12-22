import Head from "next/head";
import { Container } from "../../components/common";
import { Banner, Footer } from "../../components/containers";
import Breadcrumbs from "../../components/containers/Breadcrumbs";
import Navbar from "../../components/containers/Navbar";

const Page = ({ data, blog, params, breadcrumbs, BASE_URL }) => {
  return (
    <>
      <Head>
        <title>{blog.title}</title>

        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#fffff" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={blog.description} />
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
        <link rel="canonical" href={`${BASE_URL}/blog/${params.id}`} />

        {Object.entries(data.header?.schemas[0]).map(([id, schema]) => {
          return (
            <script
              key={id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
                  .replaceAll("[current_url]", `${BASE_URL}/blog/${params.id}`)
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
      <section className="p-4 px-[20vw]">
        <h2 className="text-4xl font-bold text-center my-10 text-primary">
          {blog.title}
        </h2>
        <p>{blog.description}</p>
      </section>
      <Footer
        data={data.footer}
        contact={data.contact}
        brand={data.header.navbar.brand}
        params={params}
      />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: params.id
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      href: `/blog/${params.id}`,
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

  const { id } = params;

  const blogs = await blogsres.json();

  const blog = blogs.find(
    (blog) => blog.href.split(/[\n|\r|?]/).join("") === id
  );

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      blog,
      params,
      breadcrumbs,
      BASE_URL: process.env.BASE_URL,
    },
  };
}

export default Page;
