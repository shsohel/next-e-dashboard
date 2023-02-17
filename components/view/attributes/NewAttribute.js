import React from 'react';
import ReactSelect from 'react-select';
import Sidebar from '../../custom/Sidebar';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAttribute,
  attributeSidebarOpen,
  bindAttributeBasicInfo,
  updateAttribute,
} from '../../../store/attributes/actions';
const NewAttribute = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { attribute } = useSelector(({ attributes }) => attributes);

  const handleDataOnChange = (e) => {
    const { name, value } = e.target;
    const updateInfo = {
      ...attribute,
      [name]: value,
    };
    dispatch(bindAttributeBasicInfo(updateInfo));
  };

  const handleDropdownOChange = (data, e) => {
    const { action, name, option } = e;
    const updateInfo = {
      ...attribute,
      [name]: data,
    };
    dispatch(bindAttributeBasicInfo(updateInfo));
  };

  const handleCreateValue = (value) => {
    const option = {
      value: value,
      label: value,
    };
    console.log(value);
    const updateInfo = {
      ...attribute,
      ['values']: [...attribute.values, option],
    };
    dispatch(bindAttributeBasicInfo(updateInfo));
  };

  const handleSubmit = () => {
    const submitObj = {
      ...attribute,
      values: attribute.values.map((s) => s.label),
    };
    if (attribute._id) {
      dispatch(updateAttribute(submitObj));
    } else {
      dispatch(addAttribute(submitObj));
    }
  };
  const handleCancel = () => {
    dispatch(attributeSidebarOpen(false));
  };

  const FooterComponent = () => {
    return (
      <div className="border px-6 py-5">
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
    );
  };
  return (
    <div>
      <Sidebar
        handleSidebarModal={handleCancel}
        isOpen={isOpen}
        title="New Attribute"
        FooterComponent={<FooterComponent />}
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={attribute.name}
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
              Attribute Value
            </label>
            <CreatableSelect
              id="valueId"
              name="values"
              isMulti
              isClearable
              value={attribute.values}
              placeholder="Select Value"
              options={[]}
              onChange={(data, e) => {
                handleDropdownOChange(data, e);
              }}
              onCreateOption={handleCreateValue}
              styles={{
                valueContainer: (styles, state) => ({
                  ...styles,
                  border: '0px',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                  ...theme.colors,
                  primary: '#0288D1',
                },
              })}
            />
          </div>
          <div className="">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="description"
              value={attribute.description}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default NewAttribute;
