import React from 'react';
import { Fragment } from 'react';
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { FaCartPlus } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 4,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];
const CustomPopover = (props) => {
  const { children, title, popoverBtn } = props;
  return (
    <div>
      <Popover className="z-10 ml-4 flow-root text-sm lg:relative lg:ml-8">
        <Popover.Button className="group  flex items-center p-2 focus:outline-0 focus:ring-0">
          {popoverBtn}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow shadow-primary dark:bg-secondary sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80  lg:ring-1 lg:ring-black lg:ring-opacity-5">
            <div className="mx-auto max-w-2xl ">
              <h2 className="mt-3 mb-1 border-b p-2 text-center dark:border-primary/50">
                {title}
              </h2>
              {children}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CustomPopover;
