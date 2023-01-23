import React from 'react';
import ReactSelect from 'react-select';
import Sidebar from '../../custom/Sidebar';
import CreatableSelect from 'react-select/creatable';
const NewAttribute = (props) => {
  const { handleSidebarModal, isOpen } = props;

  const handleSubmit = () => {
    handleSidebarModal(false);
  };
  const handleCancel = () => {
    handleSidebarModal(false);
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
        handleSidebarModal={handleSidebarModal}
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
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
              isMulti
              isClearable
              value={[]}
              placeholder="Select Value"
              options={[]}
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
              id="about"
              name="about"
              rows={3}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="description"
              defaultValue={''}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default NewAttribute;
