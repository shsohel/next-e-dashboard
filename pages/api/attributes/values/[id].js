import { baseAxios } from '../../../../services';

export default (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    baseAxios
      .get(`/attribute/${id}/values`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else if (req.method === 'PUT') {
    const { id } = req.query;

    baseAxios
      .put(`/attribute/${id}/values`, req.body)
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
