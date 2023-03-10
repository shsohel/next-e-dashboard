// import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { bindProductBasicInfo } from '../../../store/product/actions';
import { selectThemeColors } from '../../../utils/utolity';
import TabControl from '../../custom/TabControl';
// import RichEditor from '../../RichEditor';
import Attribute from './Attribute';
import GeneralInfo from './GeneralInfo';
import Inventory from './Inventory';
import ProductImage from './ProductImage';
import Shipping from './Shipping';

const ProductForm = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const { product } = useSelector(({ products }) => products);

  const handleDataOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    const updatedProduct = {
      ...product,
      [name]:
        type === 'number'
          ? Number(value)
          : type === 'checkbox'
          ? checked
          : value,
    };
    dispatch(bindProductBasicInfo(updatedProduct));
  };

  const handleDropdownOChange = () => {};

  const handleSubmit = () => {};
  const handleCancel = () => {};
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
    { id: 2, name: 'Inventory', current: false, component: <Inventory /> },
    {
      id: 3,
      name: 'Shipping',
      current: false,
      component: <Shipping />,
    },
    { id: 4, name: 'Attribute', current: false, component: <Attribute /> },
    { id: 5, name: 'Images', current: false, component: <ProductImage /> },
  ];
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
                  autoComplete="name"
                  className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.name}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              <div className="">
                <TabControl defaultTabs={defaultTabs} />
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
                  name="descriptions"
                  id="descriptions"
                  autoComplete="descriptions"
                  className="mt-1 block min-h-[5rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.descriptions}
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
                  name="shotDescriptions"
                  id="shotDescriptions"
                  autoComplete="shotDescriptions"
                  className="mt-1 block min-h-[2rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.shotDescriptions}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              {/* <div className="">
                <RichEditor />
              </div> */}
            </div>
          </div>
          {/* Category Section */}
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
