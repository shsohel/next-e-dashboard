const countryData = require('../../../utils/data/country.json');

export default (req, res) => {
  if (req.method === 'GET') {
    const countries = countryData.map((country) => ({
      country: country.name,
      code: country.code,
      state: country.states,
    }));

    res.status(200).json({ countries });
  } else {
    res.status(405).json({
      message: 'Method can not allow',
    });
  }
};
