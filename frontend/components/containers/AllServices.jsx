import Link from "next/link";
import { Container, Divider } from "../common";

export default function AllServices({ data, params }) {
  return (
    <Container>
      <div className="w-10/12 mt-10 lg:w-9/12 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-semibold uppercase mt-5 text-primary">
          Services 24/7/365:
        </h2>
        <Divider className="bg-primary" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-7 w-full">
          {data.items.map((item, index) => (
            <Link
              key={index}
              className="border rounded-md border-blue-50 p-2 font-medium bg-blue-50 hover:bg-blue-500 hover:text-white text-sm transition-all"
              href={`/${item.path}-los-angeles-ca${
                !!params?.zip ? `/${params?.zip}` : ""
              }`.replace("//", "/")}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
