import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  productCategorySidebarOpen,
  deleteProductCategory,
  getProductCategory,
  getProductCategories,
} from '../../../store/product-category/actions';
import { tableCustomStyles } from '../../../utils/utolity';
import { IoMdRefreshCircle } from 'react-icons/io';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ListLoader from '../../custom/ListLoader';
import ProductCategoryForm from './ProductCategoryForm';

const ProductCategoryList = (props) => {
  const dispatch = useDispatch();
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');

  const { productCategories, total, dataProgress, openProductCategorySidebar } =
    useSelector(({ productCategories }) => productCategories);

  const [filterObj, setFilterObj] = useState({
    name: '',
  });

  const getAllProductCategories = () => {
    dispatch(
      getProductCategories(
        {
          page: currentPage,
          limit: rowPerPage,
          sort: sortedBy,
          orderBy: orderBy,
        },
        filterObj
      )
    );
  };

  useEffect(() => {
    getAllProductCategories();
  }, [dispatch, rowPerPage, currentPage, orderBy, sortedBy, filterObj.name]);

  const handleFilterObj = (e) => {
    const { name, value } = e.target;
    setFilterObj({
      ...filterObj,
      [name]: value,
    });
  };

  const handlePerPage = (row) => {
    const value = parseInt(row);
    setRowPerPage(value);
  };
  const handleSort = (column, direction) => {
    const { sortField } = column;
    if (sortField) {
      setSortedBy(sortField);
      setOrderBy(direction);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div></div>
      <div className="mb-3 flex  items-center justify-between">
        <div className="">
          {/* <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label> */}
          <input
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="given-name"
            value={filterObj.name}
            onChange={(e) => {
              handleFilterObj(e);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex justify-center">
            <IoMdRefreshCircle
              className=" cursor-pointer fill-green-600 hover:animate-spin hover:fill-primary"
              size={30}
              onClick={() => {
                getAllProductCategories();
              }}
            />
          </div>
          <button
            className="rounded-sm bg-primary py-1 px-3 font-medium text-white hover:bg-secondary"
            onClick={() => {
              dispatch(productCategorySidebarOpen(true));
            }}
          >
            Add New
          </button>
        </div>
      </div>

      <div>
        <DataTable
          paginationTotalRows={total}
          persistTableHead
          dense
          progressPending={dataProgress}
          progressComponent={
            <div className="w-full">
              <ListLoader rowLength={10} colLength={9} />
            </div>
          }
          data={productCategories}
          className="border "
          onChangeRowsPerPage={handlePerPage}
          onSort={handleSort}
          onChangePage={handlePagination}
          paginationServer
          sortServer
          defaultSortAsc
          defaultSortFieldId={sortedBy}
          columns={[
            {
              id: 'action',
              name: 'Action',
              width: '150px',
              cell: (row) => (
                <div className="flex justify-between">
                  <FaTrashAlt
                    onClick={() => {
                      dispatch(deleteProductCategory(row));
                    }}
                    size={16}
                    className="mr-3 cursor-pointer fill-red-600"
                  />
                  <FaPencilAlt
                    onClick={() => {
                      dispatch(getProductCategory(row));
                    }}
                    size={16}
                    className="cursor-pointer fill-green-600"
                  />
                </div>
              ),
            },
            {
              id: 'name',
              name: 'Name',
              width: '150px',
              sortable: true,

              sortField: 'name',
              cell: (row) => row.name,
            },
            {
              id: 'subCategories',
              name: 'Sub Categories',
              width: '250px',

              cell: (row) => row.subCategories.map((pc) => pc.name).toString(),
            },
            {
              id: 'descriptions',
              name: 'Description',
              selector: (row) => row['descriptions'],
            },
          ]}
          customStyles={tableCustomStyles}
          pagination
        />
      </div>
      <ProductCategoryForm isOpen={openProductCategorySidebar} />
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const handleClick = () => {
    console.log('first');
  };
  const data = 'naome';

  // Pass data to the page via props
  return { props: { data } };
}

export default ProductCategoryList;
