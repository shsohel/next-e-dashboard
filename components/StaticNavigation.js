import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import UserDropdown from './UserDropdown';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const StaticNavigation = (props) => {
  const { mainNavigation } = props;
  const router = useRouter();
  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
        <div className="flex flex-shrink-0 items-center px-6">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
            alt="Workflow"
          />
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
          {/* User account dropdown */}
          <UserDropdown />
          {/* Sidebar Search */}
          <div className="mt-5 px-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 rounded-sm shadow-sm">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                aria-hidden="true"
              >
                <FaSearch
                  className="mr-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-sm border-gray-300 pl-9 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          {/* Navigation */}
          <nav className="mt-6 px-3">
            {mainNavigation.map((nav, index) => (
              <div key={index} className="space-y-1">
                <h3
                  className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  id="desktop-teams-headline"
                >
                  {nav.title}
                </h3>
                <div>
                  {nav.navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.pathname === item.href
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center rounded-sm px-2 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-primary text-white'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StaticNavigation;
