import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cars = () => {
  const [employee, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      );
      console.log(response.data); ///
      setData(response.data);
    };

    getData();
  }, []);

  console.log(employee);

  return <div>Car</div>;
};

export default Cars;
