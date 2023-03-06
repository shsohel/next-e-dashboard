import React from 'react';
import { useSelector } from 'react-redux';

const GeneralInfo = () => {
  const { product } = useSelector(({ products }) => products);
  const handleDataOnChange = (event) => {};
  return (
    <div className="grid grid-cols-1 gap-6 p-5">
      <div className="grid grid-cols-5 items-center">
        <label
          htmlFor="name"
          className="col-span-1 block text-sm font-medium text-gray-700"
        >
          Regular Price :
        </label>
        <input
          type="number"
          name="name"
          id="name"
          autoComplete="given-name"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.name}
          onChange={(e) => {
            handleDataOnChange(e);
          }}
        />
      </div>
      <div className="grid grid-cols-5 items-center">
        <label
          htmlFor="name"
          className="col-span-1 block text-sm font-medium text-gray-700"
        >
          Sale Price :
        </label>
        <input
          type="number"
          name="name"
          id="name"
          autoComplete="given-name"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.name}
          onChange={(e) => {
            handleDataOnChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
