import Image from "next/image";
import React from "react";
import { Container } from "../common";
import Navbar from "./Navbar";

export default function Banner({ data }) {
  return (
    <Container>
      <div className="lg:w-9/12 w-10/12 mt-12 flex text-center flex-col items-center text-gray-700">
        <Navbar
          services={data.allServices}
          contact={data.contact}
          header={data.header}
        />

        {/* Banner Image */}
        <div className="w-full lg:w-11/12 mt-5 h-96 rounded-3xl relative overflow-hidden">
          <Image
            src="/img/banner.jpg"
            alt="banner"
            objectFit="cover"
            fill={true}
          />
        </div>
      </div>
    </Container>
  );
}
