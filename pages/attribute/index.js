import React from 'react';
import Layout from '../../components/Layout';
import AttributeLists from '../../components/view/attributes/List';

const Attribute = () => {
  // const route = useRouter();

  // const handleNew = () => {
  //   Router.push({
  //     pathname: '/attribute/add',
  //     state: { name: 'test' },
  //   });
  // };
  return (
    <Layout title="Attribute">
      <AttributeLists />
    </Layout>
  );
};

export default Attribute;
