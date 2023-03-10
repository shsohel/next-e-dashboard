import { baseAxios } from '../../../../services';

export default (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    baseAxios
      .get(`/productCategory/${id}/sub-category`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else {
    console.log(req.method);
    res.status(405).json({
      message: 'Method can not allow',
    });
  }
};
