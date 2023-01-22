import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const UserDropdown = () => {
  return (
    <div>
      <Menu as="div" className="relative  lg:mt-2 lg:px-3">
        <div>
          <Menu.Button className="group w-full rounded-md text-left text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 lg:bg-gray-100 lg:px-3.5 lg:py-2 lg:hover:bg-gray-200  ">
            <span className="flex w-full items-center justify-between">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <img
                  className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  alt=""
                />
                <span className="hidden min-w-0 flex-1 flex-col lg:flex">
                  <span className="truncate text-sm font-medium text-gray-900">
                    Jessy Schwarz
                  </span>
                  <span className="truncate text-sm text-gray-500">
                    @jessyschwarz
                  </span>
                </span>
              </span>
              <EllipsisVerticalIcon
                className="hidden h-5 w-5 text-gray-400 group-hover:text-gray-500 lg:block"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed right-0 z-50 mx-3 mt-1  w-48 origin-top divide-y divide-gray-200  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-0 lg:w-60">
            <div className="py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    View profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Notifications
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Get desktop app
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
