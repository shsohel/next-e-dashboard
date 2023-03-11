import { baseAxios } from '../../../../services';

export default (req, res) => {
  if (req.method === 'DELETE') {
    const { slug } = req.query;
    baseAxios
      .delete(`/product/${slug}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else if (req.method === 'GET') {
    const { slug } = req.query;
    baseAxios
      .get(`/product/slug/${slug}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else if (req.method === 'PUT') {
    const { slug } = req.query;
    baseAxios
      .put(`/product/${slug}`, req.body)
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
