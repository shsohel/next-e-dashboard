import { baseAxios } from '../../../services';

export default (req, res) => {
  if (req.method === 'POST') {
    baseAxios
      .post(`/attribute/new`, req.body)
      .then((response) => {
        console.log('', response.status);
        res.status(201).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  }
};
