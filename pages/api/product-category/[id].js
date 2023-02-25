import { baseAxios } from '../../../services';

export default (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    baseAxios
      .delete(`/productCategory/${id}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else if (req.method === 'GET') {
    const { id } = req.query;
    baseAxios
      .get(`/productCategory/${id}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    baseAxios
      .put(`/productCategory/${id}`, req.body)
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
