import Link from "next/link";
import { Container } from "../common";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumbs({ items = [] }) {
  return (
    <Container>
      <div className="flex items-center space-x-5 mt-5">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            {index !== items.length - 1 ? (
              <Link
                href={item.href}
                className="flex items-center hover:text-blue-600 border-transparent border-b-2 hover:border-blue-500 transition-all"
              >
                {item.name}
                <ChevronDoubleRightIcon className="w-3" />
              </Link>
            ) : (
              <div className="flex items-center border-transparent border-b-2 transition-all">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
