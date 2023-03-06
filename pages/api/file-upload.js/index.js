import { baseAxios, baseFileAxios } from '../../../services';

export const config = {
  api: {
    bodyParse: false,
  },
};

export default (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json(res);
    // console.log('clientfile', req.body);
    // baseFileAxios
    //   .post(`/fileupload/photo/client`, req.body)
    //   .then((response) => {
    //     res.status(200).json(response.data);
    //   })
    //   .catch(({ response }) => {
    //     if (response?.data) {
    //       res.status(400).json(response?.data);
    //     } else {
    //       res.status(500).json({
    //         message: 'Server Side Error',
    //         status: 500,
    //       });
    //     }
    //   });
  } else {
    res.status(405).json({
      message: 'Method can not allow',
    });
  }
};
