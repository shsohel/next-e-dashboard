import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import ReactCreatableSelect from 'react-select/creatable';
import { selectThemeColors, uniqId } from '../../../utils/utolity';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  bindProductAttributes,
  bindProductBasicInfo,
} from '../../../store/product/actions';
import {
  getAttributeDropdown,
  getAttributeValuesDropdown,
  instantCreateAttribute,
  instantCreateValues,
} from '../../../store/attributes/actions';

const Attribute = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(({ products }) => products);
  const {
    dropdownAttribute,
    isDropdownAttribute,
    dropdownAttributeValues,
    isDropdownAttributeValues,
  } = useSelector(({ attributes }) => attributes);

  const handleDropdownOChange = (data, e, rowId) => {
    const { name } = e;
    const productAttributes = product.attributes;
    const attributes = productAttributes.map((att) => {
      if (att.id === rowId) {
        att[name] = data;
        att['values'] = name === 'attribute' ? [] : att.values;
      }
      return att;
    });
    dispatch(
      bindProductBasicInfo({
        ...product,
        attributes,
      })
    );
  };

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

  const handleAttributeDropdownOnFocus = () => {
    dispatch(getAttributeDropdown());
  };

  const handleValueOnFocus = (id) => {
    dispatch(getAttributeValuesDropdown(id));
  };

  const bindAttribute = (attribute, rowId) => {
    const option = {
      value: attribute._id,
      label: attribute.name,
    };

    const productAttributes = product.attributes;
    const attributes = productAttributes.map((att) => {
      if (att.id === rowId) {
        att['attribute'] = option;
        att['values'] = [];
      }
      return att;
    });
    dispatch(
      bindProductBasicInfo({
        ...product,
        attributes,
      })
    );
  };

  const handleAttributeCreate = (value, rowId) => {
    const option = {
      name: value,
      descriptions: value,
    };

    dispatch(instantCreateAttribute(option, bindAttribute, rowId));
  };

  const handleCreateValue = (inputValue, attribute) => {
    const data = {
      value: inputValue,
    };
    dispatch(
      instantCreateValues(data, attribute.id, attribute.attribute?.value)
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
            <th className="w-48 border border-slate-300">Attribute</th>
            <th className=" border border-slate-300">Value</th>
            <th className=" w-20 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.attributes.map((att, index) => (
            <tr key={index}>
              <td className=" border border-slate-300">
                <ReactCreatableSelect
                  theme={selectThemeColors}
                  menuPosition="fixed"
                  id="attributeIds"
                  instanceId="attributeIds"
                  name="attribute"
                  className=" w-full "
                  isClearable
                  isLoading={!isDropdownAttribute}
                  value={att.attribute}
                  options={dropdownAttribute}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e, att.id);
                  }}
                  onFocus={() => {
                    handleAttributeDropdownOnFocus();
                  }}
                  onCreateOption={(inputValue) => {
                    handleAttributeCreate(inputValue, att.id);
                  }}
                />
              </td>
              <td className="border border-slate-300">
                <ReactCreatableSelect
                  theme={selectThemeColors}
                  isMulti
                  isDisabled={!att.attribute}
                  menuPosition="fixed"
                  id="valuesId"
                  instanceId="valuesId"
                  name="values"
                  className=" w-full "
                  isClearable
                  value={att.values}
                  options={dropdownAttributeValues}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e, att.id);
                  }}
                  onCreateOption={(inputValue) => {
                    handleCreateValue(inputValue, att);
                  }}
                  onFocus={() => handleValueOnFocus(att.attribute?.value)}
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
