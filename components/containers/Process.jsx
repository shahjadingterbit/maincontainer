import Link from "next/link";
import { Container } from "../common";

export default function Process({ data }) {
  const step = (stepNum, des) => (
  <div className="grid grid-cols-process lg:block text-left items-center">
    <h2 className="italic p-3 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-center">
      {stepNum}
    </h2>
    <h2 className="font-semibold mt-2 text-lg p-3 px-5 lg:p-7  bg-blue-50 rounded-lg">
      {des}
    </h2>
  </div>
  );

  const callLink = () => (
    <p>
      Call Us <br /> <Link href={`tel:${data.phone}`}>{data.phone}</Link>
    </p>
  );

  return (
    <Container className="py-10 lg:py-12 mt-10">
      <div className="w-10/12 lg:w-9/12 grid lg:grid-cols-4 gap-7 grid-rows-1">
        {step("01", "Determine your exact location")}
        {step("02", callLink())}
        {step("03", "Describe Us The Situation")}
        {step("04", "Stay Safe - We Will Be There Quickly!")}
      </div>
    </Container>
  );
}
