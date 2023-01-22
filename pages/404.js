import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <div>
      <div class="flex h-screen w-screen items-center bg-gray-100">
        <div class="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div class="max-w-md">
            <div class="font-dark text-5xl font-bold">404</div>
            <p class="text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldn't find this page.{' '}
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <button class="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600">
              <Link href="/">back to homepage</Link>
            </button>
          </div>
          <div class="max-w-lg">
            <></>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
