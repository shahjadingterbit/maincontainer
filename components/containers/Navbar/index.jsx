"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { CallLink, Container } from "../../common";

const Navbar = ({ contact, services, params, header }) => {
  const [sidebar, openSidebar] = useState(false);
  const handleSidebar = () => {
    openSidebar(!sidebar);
  };

  return (
    <Container>
      <nav className="w-full lg:w-9/12 flex space-y-3 flex-col items-center text-center">
        <div className="text-primary">
          <Link href="/">
            <h1 className="text-4xl mb-3 font-semibold">
              {header.meta_heading_h1}
            </h1>
          </Link>
          <h2 className="text-lg hidden lg:block">{contact.text}</h2>
        </div>
        <CallLink className="hidden lg:block" data={contact} />
        <div className="hidden pt-3 lg:flex items-center justify-center space-x-4">
          <Link className="hover:text-blue-700" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-700" href="/contact-us">
            Contact Us
          </Link>
          <Link className="hover:text-blue-700" href="/blog">
            Blog
          </Link>
          <Dropdown data={services} params={params} />
        </div>
        <span className="hidden lg:block"></span>
        <div className="lg:hidden w-full relative flex items-center flex-col">
          <Bars3Icon onClick={handleSidebar} className="text-primary h-9" />

          {/* NavBar Phone */}
          <div
            className={
              sidebar
                ? "lg:hidden p-10 w-full flex flex-col items-center"
                : "hidden"
            }
          >
            <Link
              className="w-full px-3 pt-5 pb-3 border-b border-primary"
              href="/"
            >
              Home
            </Link>
            <Dropdown data={services} />
            <Link
              className="w-full px-3 pt-5 pb-3 border-b border-primary"
              href="/blog"
            >
              Blogs
            </Link>
            <Link
              className="w-full px-3 pt-5 pb-3 border-b border-primary"
              href="/contact-us"
            >
              Contact Us
            </Link>
            <span className="mt-20 flex justify-center w-full">
              <CallLink
                className="w-full text-xl btnPrimary text-white"
                data={contact}
              />
            </span>
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
