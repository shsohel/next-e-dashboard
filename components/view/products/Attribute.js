import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import {
  selectThemeColors,
  tableCustomStyles,
  uniqId,
} from '../../../utils/utolity';
import {
  PlayPauseIcon,
  SquaresPlusIcon,
  PlusCircleIcon,
  PlusIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { bindProductBasicInfo } from '../../../store/product/actions';
import DataTable from 'react-data-table-component';

const Attribute = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(({ products }) => products);
  const handleDataOnChange = (event) => {};
  const handleDropdownOChange = (event) => {};
  const addAttribute = () => {
    const newAttribute = {
      id: uniqId(),
      attribute: null,
      values: [],
    };

    const attr = [...product.attributes];
    const updatedAttributes = [...attr, newAttribute];
    dispatch(
      bindProductBasicInfo({
        ...product,
        attributes: updatedAttributes,
      })
    );
  };

  const handleRemoveAttribute = (id) => {
    const attr = [...product.attributes];
    const updatedAttributes = attr.filter((attribute) => attribute.id !== id);
    dispatch(
      bindProductBasicInfo({
        ...product,
        attributes: updatedAttributes,
      })
    );
  };
  return (
    <div className="grid grid-cols-1 gap-6 p-5">
      {/* <DataTable
        persistTableHead
        className="border "
        dense
        data={product.attributes}
        customStyles={tableCustomStyles}
        columns={[
          {
            id: 'attributeId-box',
            instanceId: 'attributeId-box',
            name: 'Attribute',
            width: '200px',

            cell: (row) => (
              <ReactSelect
                menuPosition="fixed"
                id="attributeIds"
                instanceId="attributeIds"
                name="status"
                className=" w-full "
                isClearable
                value={null}
                options={[]}
                onChange={(data, e) => {
                  handleDropdownOChange(data, e);
                }}
                theme={selectThemeColors}
              />
            ),
          },
          {
            id: 'valueId',
            instanceId: 'valueId',

            name: 'Values',
            minWidth: '250px',

            cell: (row) => (
              <ReactSelect
                menuPosition="fixed"
                instanceId="statusId"
                isMulti
                name="status"
                className=" w-full "
                isClearable
                value={null}
                options={[]}
                onChange={(data, e) => {
                  handleDropdownOChange(data, e);
                }}
                theme={selectThemeColors}
              />
            ),
          },
          {
            instanceId: 'actionId',
            name: 'Action',
            width: '90px',
            cell: (row) => (
              <MinusCircleIcon
                onClick={() => {
                  handleRemoveAttribute(row.id);
                }}
                className=" cursor-pointer text-red-700 hover:fill-gray-200 hover:text-black  "
                height={24}
                width={24}
              />
            ),
          },
        ]}
      /> */}
      <table className="border-separate border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Attribute</th>
            <th className=" border border-slate-300">Value</th>
            <th className=" w-20 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.attributes.map((att, index) => (
            <tr key={index}>
              <td className=" border border-slate-300">
                <ReactSelect
                  menuPosition="fixed"
                  id="attributeIds"
                  instanceId="attributeIds"
                  name="status"
                  className=" w-full "
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </td>
              <td className="border border-slate-300">
                <ReactSelect
                  menuPosition="fixed"
                  id="attributeIds"
                  instanceId="attributeIds"
                  name="status"
                  className=" w-full "
                  isClearable
                  value={null}
                  options={[]}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  theme={selectThemeColors}
                />
              </td>
              <td className="  border border-slate-300">
                <div className="flex justify-center">
                  <MinusCircleIcon
                    onClick={() => {
                      handleRemoveAttribute(att.id);
                    }}
                    className=" cursor-pointer text-red-700 hover:fill-gray-200 hover:text-black  "
                    height={24}
                    width={24}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <div>
          <PlusCircleIcon
            onClick={() => {
              addAttribute();
            }}
            className=" hover:fill-slate-00 cursor-pointer  text-green-700"
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Attribute;
