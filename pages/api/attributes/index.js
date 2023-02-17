import { baseAxios } from '../../../services';
import { convertQueryString } from '../../../utils/utolity';

export default (req, res) => {
  if (req.method === 'POST') {
    baseAxios
      .post(`/attribute?${convertQueryString(req.query)}`, req.body)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(({ response }) => {
        res.status(400).json(response.data);
      });
  } else {
    res.status(405).json({
      message: 'Method can not allow',
    });
  }
};
