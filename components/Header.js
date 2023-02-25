import { ClockIcon, HomeIcon, VariableIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import SidebarNav from './custom/SidebarNav';
import StaticNavigation from './StaticNavigation';
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My tasks', href: '#', icon: VariableIcon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
];
const teams = [
  { name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
];

const mainNavigation = [
  {
    title: 'Main',
    navigation: [
      { name: 'Home', href: '/', icon: HomeIcon, current: true },
      {
        name: 'Attribute',
        href: '/attribute',
        icon: VariableIcon,
        current: false,
      },
      {
        name: 'Product Category',
        href: '/product-category',
        icon: VariableIcon,
        current: false,
      },
      { name: 'Recent', href: '#', icon: ClockIcon, current: false },
    ],
  },
  {
    title: 'Team',
    navigation: [
      { name: 'Engineering', href: '#', icon: VariableIcon, current: false },
      {
        name: 'Human Resources',
        href: '#',
        icon: VariableIcon,
        current: false,
      },
      {
        name: 'Customer Success',
        href: '#',
        icon: VariableIcon,
        current: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = (props) => {
  const { sidebarOpen, onSidebar } = props;
  const router = useRouter();

  return (
    <>
      <SidebarNav
        onHandleSidebar={onSidebar}
        navigation={navigation}
        isOpen={sidebarOpen}
      >
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 h-0 flex-1 overflow-y-auto">
          <nav className="px-2">
            <div className="space-y-1">
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
            </div>
          </nav>
        </div>
      </SidebarNav>
      <StaticNavigation mainNavigation={mainNavigation} />
    </>
  );
};

export default Header;
