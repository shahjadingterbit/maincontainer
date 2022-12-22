import Link from "next/link";
import { Container } from "../common";

export default function Footer({ data, contact, brand, params }) {
  return (
    <Container className="border-t py-16 mt-16">
      <div className="lg:w-9/12 w-10/12 text-left flex flex-col gap-10 lg:gap-24 lg:flex-row justify-center">
        <div>
          <Link href={brand.href}>
            <h2 className="text-4xl text-primary mb-3 font-semibold">
              Los Angeles Towing Services
            </h2>
          </Link>
          <p className="mt-5">
            Phone: <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {data.services.title}
          </h2>
          <ul className="grid lg:grid-cols-2 mt-5 gap-x-24 text-lg">
            {data.services.items.map((item, index) => (
              <li key={index}>
                <Link
                  className="hover:text-primary text-gray-500 transition-all"
                  href={`/${item.path}-los-angeles-ca${
                    !!params?.zip ? `/${params?.zip}` : ""
                  }`.replace("//", "/")}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
