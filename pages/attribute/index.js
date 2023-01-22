import Router, { useRouter } from 'next/router';
import React from 'react';
import DataTable from 'react-data-table-component';
import Layout from '../../components/Layout';
const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
];
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#0F172A',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  // cells: {
  //   style: {
  //     // border: '1px solid red',
  //     // paddingLeft: '16px',
  //     // paddingRight: '16px',
  //     wordBreak: 'break-word',
  //   },
  //   draggingStyle: {},
  // },
};
const Attribute = () => {
  const route = useRouter();

  const handleNew = () => {
    Router.push({
      pathname: '/attribute/add',
      state: { name: 'test' },
    });
  };
  return (
    <Layout title="Attribute">
      <div className="mb-3 flex  justify-end p-1">
        <button
          className="rounded-sm bg-primary p-1 font-medium text-white hover:bg-secondary"
          onClick={() => {
            handleNew();
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
              selector: (row) => row['name'],
            },
            {
              id: 'title',
              name: 'Title',
              selector: (row) => row['title'],
            },
          ]}
          data={people}
          customStyles={customStyles}
        />
      </div>
    </Layout>
  );
};

export default Attribute;
