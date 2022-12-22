import Image from "next/image";
import { Container, Divider } from "../common";

export default function FeaturedOn() {
  return (
    <Container>
      <div className="w-10/12 lg:w-9/12 flex flex-col items-center">
        <h2 className="text-2xl uppercase font-semibold text-primary">
          Featured On
        </h2>
        <Divider className="bg-primary" />
        <div className="flex lg:flex-row flex-col items-center gap-3 mt-7">
          <Image
            className="mx-3"
            src="/img/heavydute.webp"
            height={110}
            width={110}
            alt="partner log"
          />
          <Image
            className="mx-3"
            src="/img/roadside-service.webp"
            height={110}
            width={110}
            alt="partner log"
          />
          <Image
            className="mx-3"
            src="/img/towingcom.webp"
            height={110}
            width={110}
            alt="partner log"
          />
          <Image
            className="mx-3"
            src="/img/saarshani.webp"
            height={110}
            width={110}
            alt="partner log"
          />
        </div>
      </div>
    </Container>
  );
}
