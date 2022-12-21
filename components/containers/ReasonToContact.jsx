import Link from "next/link";
import { Container } from "../common";

export default function ReasonToContact({ contact }) {
  return (
    <Container className="bg-primary mt-16">
      <div className="w-10/12 lg:w-9/12 text-center text-white py-16 lg:p-16">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold">Main Reasons To Choose Us</h2>
          <p className="mt-3 text-gray-200">
            It is too complicated to explain in words why we offer the best
            emergency roadside services in the entire region.-We are available
            24 hours a day. Our drivers and technicians are always there for you
            no matter what conditions. Compared companies may find problems with
            weather conditions, working conditions, or vehicle mode capabilities
            for successful completion of the service. We use the most modern
            equipment, and our trucks are equipped with all possible tools (such
            as dollies, skates, low-clearance recovery, and more) to finish the
            job with a hundred percent success and provide the customer a
            maximum of satisfaction without any headache.-If you take a few
            minutes and concentrate on a market survey of towing and roadside
            assistance prices in L-A, you will see that we are offering
            excellent and most convenient prices comparing to the market. If you
            prefer to use one of our vendors, please click here to see the list.
          </p>
          <h2 className="text-2xl font-bold mt-10">
            Highest Safety Tow Truck Service
          </h2>
          <p className="mt-3 text-gray-200">
            We have no doubt that LOS ANGELES TOWING SERVICES is among the
            cheapest tow truck & roadside providers in L-A. -Our response times
            are from the highest standards, from the dispatching office who
            answers your phone call and transmits the required information to
            the driver who is the closest to your vehicle location. During an
            emergency situation, we know how to do the best efforts to reach the
            customer in distress in the shortest time to help and rescue him,
            and all that 24/7. -We provide services within all the highways and
            freeways in L-A. From the simplest job of providing fuel for your
            vehicle and to the most sophisticated work of rescues vehicles after
            collisions and rollovers. <br /> You are welcome to contact us for
            more details and further questions we will be happy to stand here
            and provide you with all the information possible. <br /> So call us
            today <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>.
            Recommended towing & roadside assistance vendor in Los Angeles
          </p>
        </div>
      </div>
    </Container>
  );
}
