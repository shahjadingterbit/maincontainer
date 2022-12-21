import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Dropdown({ data, params }) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full lg:w-auto">
      <Menu.Button className="inline-flex hover:text-blue-700 lg:justify-center lg:px-0 w-full px-3 pt-5 lg:pt-0 pb-3 lg:pb-0 border-b lg:border-none border-primary items-center justify-center">
        Services
        <ChevronDownIcon className="w-4" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:fixed w-full lg:w-auto lg:right-[15%] lg:left-[15%] top-0 mt-12 flex items-center justify-center rounded-xl z-10">
          <div className="relative w-full shadow-2xl shadow-gray-900 rounded-xl bg-primary scroll-smooth text-white p-5 lg:p-7">
            <h2 className="text-2xl text-center font-semibod">Our Services</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-3 w-full">
              {data.items.map((item, index) => (
                <Menu.Item key={index}>
                  <Link
                    className="p-2 rounded border border-white/50 text-center hover:text-black text-xs hover:bg-white transition-all"
                    href={`/${item.path}-los-angeles-ca${
                      !!params?.zip ? `/${params?.zip}` : ""
                    }`.replace("//", "/")}
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
