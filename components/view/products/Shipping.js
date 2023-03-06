import React from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { selectThemeColors } from '../../../utils/utolity';

const Shipping = () => {
  const { product } = useSelector(({ products }) => products);
  const handleDataOnChange = (event) => {};
  const handleDropdownOChange = (event) => {};
  return (
    <div className="grid grid-cols-1 gap-6 p-5">
      <div className="grid grid-cols-5 items-center">
        <label
          htmlFor="name"
          className="col-span-1 block text-sm font-medium text-gray-700"
        >
          Weight(kg)
        </label>
        <input
          type="number"
          name="name"
          id="name"
          autoComplete="given-name"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.name}
          onChange={(e) => {
            handleDataOnChange(e);
          }}
        />
      </div>
      <div className="grid grid-cols-5 items-center gap-4">
        <label
          htmlFor="name"
          className="col-span-1 block text-sm font-medium text-gray-700"
        >
          Dimensions (cm)
        </label>
        <div className="col-span-4">
          <div className="grid grid-cols-3 gap-6">
            <input
              type="number"
              name="name"
              id="name"
              autoComplete="given-name"
              placeholder="Length"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.name}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
            <input
              type="number"
              name="name"
              id="name"
              autoComplete="given-name"
              placeholder="Width"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.name}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
            <input
              type="number"
              name="name"
              id="name"
              autoComplete="given-name"
              placeholder="Height"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.name}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 items-center">
        <label
          htmlFor="name"
          className="col-span-1 block text-sm font-medium text-gray-700"
        >
          Shipping Class
        </label>
        <ReactSelect
          id="statusId"
          instanceId="statusId"
          name="status"
          className="col-span-4 mt-1 w-full focus:ring-0"
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
  );
};

export default Shipping;
