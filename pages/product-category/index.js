import React from 'react';
import Layout from '../../components/Layout';
import ProductCategoryList from '../../components/view/product-categories/List';

const ProductCategory = (props) => {
  return (
    <Layout title="Product Category">
      <ProductCategoryList />
    </Layout>
  );
};

export default ProductCategory;
