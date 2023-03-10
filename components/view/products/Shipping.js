import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { bindProductBasicInfo } from '../../../store/product/actions';
import { selectThemeColors } from '../../../utils/utolity';

const Shipping = () => {
  const dispatch = useDispatch();
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

  const handleDropdownOChange = (data, e) => {
    const { name } = e;
    const updatedProduct = {
      ...product,
      [name]: data,
    };
    dispatch(bindProductBasicInfo(updatedProduct));
  };
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
          name="weight"
          id="weight"
          autoComplete="weight"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.weight}
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
              name="length"
              id="length"
              autoComplete="given-name"
              placeholder="Length"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.length}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
            <input
              type="number"
              name="width"
              id="width"
              autoComplete="width"
              placeholder="Width"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.width}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
            <input
              type="number"
              name="height"
              id="height"
              autoComplete="height"
              placeholder="Height"
              className="mt-1  block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:border-primary focus:ring-primary "
              value={product.height}
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
          id="shippingMethodId"
          instanceId="shippingMethodId"
          name="shippingMethod"
          className="col-span-4 mt-1 w-full focus:ring-0"
          isClearable
          value={product.shippingMethod}
          options={[{ label: 'Free shipping', value: 'Free shipping' }]}
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
