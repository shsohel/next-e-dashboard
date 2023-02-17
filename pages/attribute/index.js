import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import AttributeLists from '../../components/view/attributes/List';
import { baseAxios } from '../../services';
import { getAttribute } from '../../store/attributes/actions';

const Attribute = (props) => {
  return (
    <Layout title="Attribute">
      <AttributeLists />
    </Layout>
  );
};

export default Attribute;
