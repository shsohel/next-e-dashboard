import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { selectThemeColors } from '../../../utils/utolity';
import GeneralInfo from './GeneralInfo';

const defaultTabs = [
  {
    id: 1,
    name: 'General',
    current: true,
    component: (
      <div>
        <GeneralInfo />
      </div>
    ),
  },
  { id: 2, name: 'Inventory', current: false, component: <div>2nd</div> },
  {
    id: 3,
    name: 'Shipping',
    current: false,
    component: <div>3rd</div>,
  },
  { id: 4, name: 'Attribute', current: false, component: <div>4th</div> },
  { id: 5, name: 'Advanced', current: false, component: <div>4th</div> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const ProductForm = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(defaultTabs);
  const { product } = useSelector(({ products }) => products);

  const handleDataOnChange = (event) => {};

  const handleDropdownOChange = () => {};

  const handleSubmit = () => {};
  const handleCancel = () => {};
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
      <div className="mb-1 border px-5 py-2 text-right">
        <button
          className="mr-2 rounded-sm bg-primary py-1 px-4 text-white hover:bg-secondary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </button>
        <button
          className="rounded-sm bg-danger py-1 px-4 text-white hover:bg-gray-400"
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
      <div className="min-h-[30rem] rounded-sm border p-5">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Title :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.name}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              <div className="">
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
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
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
                            key={tab.name}
                            onClick={() => {
                              handleTableControl(tab);
                            }}
                            className={classNames(
                              tab.current
                                ? 'text-gray-900'
                                : 'text-gray-500 hover:text-gray-700',
                              'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-left  text-sm font-medium hover:bg-gray-50 focus:z-10'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                          >
                            <span>{tab.name}</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                tab.current
                                  ? 'bg-indigo-500'
                                  : 'bg-transparent',
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
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <textarea
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="mt-1 block min-h-[5rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.name}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description
                </label>
                <textarea
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="mt-1 block min-h-[2rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.name}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Status
                </label>
                <ReactSelect
                  id="statusId"
                  instanceId="statusId"
                  name="status"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Category
                </label>
                <CreatableSelect
                  id="statusId"
                  instanceId="statusId"
                  name="status"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Sub Category
                </label>
                <CreatableSelect
                  id="statusId"
                  isMulti
                  instanceId="statusId"
                  name="status"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <CreatableSelect
                  id="statusId"
                  isMulti
                  instanceId="statusId"
                  name="status"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
