import Link from "next/link";
import { Fragment } from "react";

const Elements = ({ elements, className = "" }) => {
  return (
    <div className={className}>
      {elements.map((element, index) => {
        switch (element.type) {
          case "p":
            if (element.children) {
              return (
                <p key={index}>
                  {element.children.map((child, index) => {
                    switch (child.type) {
                      case "text":
                        return <Fragment key={index}>{child.value}</Fragment>;
                      case "a":
                        return (
                          <Link key={index} href={child.href}>
                            {child.text}
                          </Link>
                        );
                    }
                  })}
                </p>
              );
            }
            return <p key={index}>{element.value}</p>;
          case "text":
            return <Fragment key={index}>{element.value}</Fragment>;
          case "h3":
            return (
              <h3
                key={index}
                className="text-2xl mb-3 font-extrabold uppercase"
              >
                {element.value}
              </h3>
            );
        }
      })}
    </div>
  );
};

export default Elements;
