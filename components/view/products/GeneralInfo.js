import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindProductBasicInfo } from '../../../store/product/actions';

const GeneralInfo = () => {
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
          name="price"
          id="price"
          autoComplete="price"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.price}
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
          name="salePrice"
          id="salePrice"
          autoComplete="salePrice"
          className="col-span-4 mt-1 block w-full rounded-sm border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
          value={product.salePrice}
          onChange={(e) => {
            handleDataOnChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
