import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Container, Divider } from "../common";

export default function index({ componentTitle, options }) {
  return (
    <Container>
      <h2 className="text-xl uppercase lg:text-2xl text-primary font-bold text-center">
        {componentTitle}
      </h2>
      <Divider className="bg-primary" />
      <div className="w-10/12 mt-5 lg:w-5/12 flex flex-col items-center">
        {/* {options.map((item, key) => {
          return (
            <Menu
              key={key}
              as="div"
              className="relative inline-block text-left w-full mb-1"
            >
              <div>
                <Menu.Button className="w-full rounded-lg bg-primary text-white p-3 px-5 flex items-center justify-between border-b">
                  {item.question}
                  <ChevronDownIcon className="h-5" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-1000"
                enterFrom="transform opacity-0 translate-y-50"
                enterTo="transform opacity-100 translate-y-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="bg-blue-50 rounded-b-lg">
                  <div className="flex flex-col items-center h-full">
                    <div className="w-full p-5 flex items-center justify-between">
                      {item.answer}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        })} */}

        {/* {options.map((item, key) => {
          return (
            <Disclosure key={key} as="div" className="w-full">
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full bg-primary text-white p-3 px-5 flex items-center justify-between border-b">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Transition
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel className="bg-blue-50 p-5">
                      {item.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })} */}
      </div>
    </Container>
  );
}
