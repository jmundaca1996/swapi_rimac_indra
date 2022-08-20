'use strict';
const swapi = require('../responses/swapi');
module.exports.detail = async (event) => {
  const url_aws = event.headers.Host;
  return {
    statusCode: 200,
    body: swapi.response({
      people: `https://${url_aws}/dev/api/people/:id`,
      peoples: `https://${url_aws}/dev/api/people`,
      peopleSubmit: 'https://' + url_aws + '/api/people/submit'
    })
  };
};
