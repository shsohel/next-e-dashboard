import React from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../../../utils/utolity';
import NewAttribute from './NewAttribute';
const attributes = [
  {
    name: 'Size',
    descriptions: 'Regional Paradigm Technician',
    values: [],
  },
  {
    name: 'Cody Fisher',
    descriptions: 'Product Directives Officer',
    values: [],
  },
];

const AttributeLists = () => {
  const [openAttributeForm, setOpenAttributeForm] = useState(false);
  const handleNew = (condition) => {
    setOpenAttributeForm(condition);
  };
  return (
    <div>
      <div className="mb-3 flex  justify-end p-1">
        <button
          className="rounded-sm bg-primary py-1 px-3 font-medium text-white hover:bg-secondary"
          onClick={() => {
            handleNew(true);
          }}
        >
          Add New
        </button>
      </div>

      <div>
        <DataTable
          dense
          className="border "
          columns={[
            {
              id: 'name',
              name: 'Name',
              width: '150px',
              selector: (row) => row['name'],
            },
            {
              id: 'value',
              name: 'Value',
              width: '250px',

              selector: (row) => row['value'],
            },
            {
              id: 'descriptions',
              name: 'Description',
              selector: (row) => row['descriptions'],
            },
          ]}
          data={attributes}
          customStyles={tableCustomStyles}
        />
      </div>
      <NewAttribute isOpen={openAttributeForm} handleSidebarModal={handleNew} />
    </div>
  );
};

export default AttributeLists;
