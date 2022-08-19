const axios = require('axios');
const maperr = require('../helper/mapping');
const url = 'https://swapi.dev/api/people/';

module.exports.obtenerPersonasSw = async (id) => {
  const data = await axios
    .get(`${url}${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return maperr.transform(data);
};
