import { baseAxios } from '../../../services';
import { convertQueryString } from '../../../utils/utolity';

export default (req, res) => {
  if (req.method === 'POST') {
    baseAxios
      .post(`/tag?${convertQueryString(req.query)}`, req.body)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        if (response?.data) {
          res.status(400).json(response?.data);
        } else {
          res.status(500).json({
            message: 'Server Side Error',
            status: 500,
          });
        }
      });
  } else if (req.method === 'GET') {
    baseAxios
      .get(`/tag`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        if (response?.data) {
          res.status(400).json(response?.data);
        } else {
          res.status(500).json({
            message: 'Server Side Error',
            status: 500,
          });
        }
      });
  } else {
    res.status(405).json({
      message: 'Method can not allow',
    });
  }
};
