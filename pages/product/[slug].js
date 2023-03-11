import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import ProductEditForm from '../../components/view/products/ProductEditForm';
import { getProductBySlug } from '../../store/product/actions';

const EditProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [dispatch, slug]);

  return (
    <Layout title="Product">
      <ProductEditForm />
    </Layout>
  );
};

export default EditProduct;
