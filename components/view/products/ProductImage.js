import { ArrowUpTrayIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productImageUpload } from '../../../store/file/actions';

const imagePath = 'http://localhost:5000/uploads';
const ProductImage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(({ products }) => products);
  const handleDataOnChange = (event) => {};

  const handleFileUpload = (event) => {
    const { files } = event.target;
    const file = files[0];
    let formData = new FormData();
    formData.append('file', file);

    dispatch(productImageUpload(formData));
    //const images = [...product.images];
  };

  return (
    <div className="grid h-full grid-cols-1 gap-6 p-5">
      <div className="mb-5 grid  h-32 grid-cols-2 gap-2  lg:grid-cols-4">
        {product.images.map((image, index) => (
          <div
            key={index}
            className="group relative  h-32 w-full bg-purple-600"
          >
            <Image
              alt={image.url}
              //   width={100}
              //  height={100}
              src={`${imagePath}/${image.url}`}
              fill
              className="object-cover"
            />
            <div className="group absolute bottom-0 right-0 z-10 flex items-center justify-center text-sm font-semibold text-white duration-300 group-hover:bg-secondary/50">
              <div className="  bg-primary text-center opacity-0 group-hover:opacity-100">
                <div>
                  <input
                    type="checkbox"
                    name="isDefault"
                    id="isDefaultId"
                    autoComplete="given-name"
                    className=" block h-4 w-4 rounded-sm border-primary text-sm shadow-sm ring-0 focus:border-primary focus:ring-0 "
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid  grid-cols-1 ">
        <label className=" p-2" htmlFor="fileId">
          <div className="flex place-items-center space-x-4">
            <div>Upload</div>
            <div>
              <ArrowUpTrayIcon className="h-5 w-5" />
            </div>
          </div>
        </label>
        <input
          type="file"
          name="name"
          id="fileId"
          accept="image/*"
          autoComplete="given-name"
          className="col-span-4 mt-1 hidden w-full rounded-sm border-gray-300  text-sm shadow-sm focus:border-primary focus:ring-primary "
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
      </div>
    </div>
  );
};

export default ProductImage;
