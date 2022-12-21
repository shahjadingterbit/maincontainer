import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Container, Divider } from "../common";

export default function Reviews({ data }) {
  let stars = new Array(5)
    .fill(0)
    .map((_, index) => (
      <StarIcon key={index} className="h-4 text-yellow-300" />
    ));

  return (
    <Container className="mt-20">
      <div className="w-10/12 lg:w-9/12 flex flex-col items-center">
        <h2 className="text-2xl text-primary uppercase text-center font-semibold">
          {data.title}
        </h2>
        <Divider className="bg-primary" />
        <div className="mt-5 grid lg:grid-cols-2 gap-5 w-full">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 items-center text-center bg-blue-50 p-10 rounded-xl"
            >
              <h3 className="font-semibold">{item.author.name}</h3>
              <p>{item.review}</p>
              <p className="flex items-center">
                <span className="mr-2 mt-1">{item.stars}.0</span>
                {stars
                  .map((item, index) => <Fragment key={index}>{item}</Fragment>)
                  .slice(0, item.stars)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
