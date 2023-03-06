import axios from 'axios';
import { uniqId } from '../../../utils/utolity';
import { bindProductBasicInfo } from '../../product/actions';

export const productImageUpload = (file) => (dispatch, getState) => {
  const apiEndPoint = `http://localhost:5000/api/v1/fileupload/photo`;
  axios.post(apiEndPoint, file).then((response) => {
    if (response.status === 200) {
      const { product } = getState().products;

      const images = [
        ...product.images,
        {
          id: uniqId(),
          isDefault: false,
          url: response.data.data,
        },
      ];
      const updatedProduct = {
        ...product,
        images,
      };
      dispatch(bindProductBasicInfo(updatedProduct));
    }
    console.log(response);
  });
};
