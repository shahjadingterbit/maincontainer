import Link from "next/link";
import { Divider } from "../components/common";
import {
  Aboutus,
  Accordian,
  Banner,
  Breadcrumbs,
  Choice,
  ContactForm,
  Footer,
  Map,
  Process,
  Reviews,
  Services,
  Video,
  WhyUs,
  Zips,
} from "../components/containers";

export default function PageGenerator({
  data,
  params,
  breadcrumbs,
  type = "home",
  BASE_URL,
}) {
  return (
    <div className="text-center">
      <Banner data={data} />
      <Breadcrumbs items={breadcrumbs} />
      {type === "home" && (
        <>
          <Choice contact={data.contact} />
          <WhyUs contact={data.contact} />
        </>
      )}
      {type === "contact-us" && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-primary">CONTACT US</h2>
          </div>
          <Divider className="bg-primary" />
          <p className="p-2">
            <span className="text-primary font-bold">Address: </span>
            {data.contact.Address}
          </p>
          <p className="p-2">
            <span className="text-primary font-bold">Hours: </span>
            {data.contact.Hours}
          </p>
          <p className="p-2">
            <span className="text-primary font-bold">Phone: </span>
            <Link href={`tel:${data.contact.phone}`}>{data.contact.phone}</Link>
          </p>
          <p className="p-2">
            <span className="text-primary font-bold">
              Online appointments:{" "}
            </span>
            <a href={BASE_URL}>{BASE_URL}</a>
          </p>
        </div>
      )}
      <Services data={data.allServices} params={params} />
      <div className="grid lg:grid-cols-2 mt-16">
        <Map
          zip={params?.zip}
          data={{
            state: data.header.state,
            StateCode: data.header.StateCode,
            county: data.header.county,
            city: data.header.city,
            latitude: data.header.latitude,
            longitude: data.header.longitude,
          }}
        />
        <Zips
          data={data.zips}
          params={params}
          default_service={data.header.default_service}
        />
      </div>
      {type === "home" && (
        <>
          <Aboutus data={data.about} />
          <Accordian options={data.header.howData} componentTitle="How To" />
        </>
      )}
      {(type === "home" || type === "service" || type === "zip") && (
        <Video data={data.header.videoData} />
      )}
      {type === "home" && (
        <>
          <Accordian options={data.header.faqData} componentTitle="FAQs" />
          <Reviews data={data.reviews} />
          <ContactForm data={data.form} BASE_URL={BASE_URL} />
        </>
      )}
      <Process data={data.contact} />
      <Footer
        data={data.footer}
        contact={data.contact}
        brand={data.header.navbar.brand}
        params={params}
      />
    </div>
  );
}
