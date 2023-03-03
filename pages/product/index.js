import React from 'react';
import Layout from '../../components/Layout';
import ProductList from '../../components/view/products/List';

const Product = (props) => {
  return (
    <Layout title="Product Category">
      <ProductList />
    </Layout>
  );
};

export default Product;
