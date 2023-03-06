import React from 'react';
import { useState } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const TabControl = (props) => {
  const { defaultTabs } = props;
  const [tabs, setTabs] = useState(defaultTabs);

  const handleTableControl = (t) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === t.id) {
        tab['current'] = true;
      } else {
        tab['current'] = false;
      }
      return tab;
    });
    setTabs(updatedTabs);
  };
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab, index) => (
            <option key={index}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="flex ">
        <div className=" border">
          <nav
            className=" z-0 flex flex-col divide-y  divide-gray-200  shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <button
                key={tabIdx}
                onClick={() => {
                  handleTableControl(tab);
                }}
                className={classNames(
                  tab.current
                    ? ' text-gray-900'
                    : 'text-gray-500 hover:text-gray-700',
                  'group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-4 text-left  text-sm font-medium hover:bg-gray-50 focus:z-10'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? 'bg-indigo-500' : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5'
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        <div className=" w-full border border-l-0 px-6">
          {tabs.map((tab, tabIdx) => (
            <div hidden={!tab.current} key={tabIdx}>
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabControl;
