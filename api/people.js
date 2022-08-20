'use strict';
const swapi = require('../responses/swapi');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const swapiPeople = require('../swapi/swapiPeople');
AWS.config.setPromisesDependency(require('bluebird'));

const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addFormat('date-time', function (dateTimeString) {
  if (typeof dateTimeString === 'object') {
    dateTimeString = dateTimeString.toISOString();
  }
  return !isNaN(Date.parse(dateTimeString));
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const schema = {
  description: 'Una persona del universo de Star Wars',
  title: 'People',
  type: 'object',
  properties: {
    anio_nacimiento: { type: 'string' },
    color_ojos: { type: 'string' },
    peliculas: { type: 'array' },
    genero: { type: 'string' },
    color_cabello: { type: 'string' },
    talla: { type: 'string' },
    planeta: { type: 'string' },
    masa: { type: 'string' },
    nombre: { type: 'string' },
    color_piel: { type: 'string' },
    creacion: { type: 'string', format: 'date-time' },
    edicion: { type: 'string', format: 'date-time' },
    especies: { type: 'array' },
    naves: { type: 'array' },
    id: { type: 'string' },
    vehiculos: { type: 'array' }
  },
  required: [
    'anio_nacimiento',
    'color_ojos',
    'peliculas',
    'genero',
    'color_cabello',
    'talla',
    'planeta',
    'masa',
    'nombre',
    'color_piel',
    'especies',
    'naves',
    'vehiculos'
  ]
};

module.exports.index = async (event) => {
  const query =
    typeof event.queryStringParameters != 'undefined'
      ? event.queryStringParameters
      : {};
  const search =
    query && typeof query.search != 'undefined' ? query.search : '';

  let params = {
    TableName: process.env.TABLA_PERSONAS
  };
  if (search != '') {
    let condition_stack = [];
    for (let field of schema.required) condition_stack.push(field + ' = :s');
    params.FilterExpression = condition_stack.join(' OR ');

    params.ExpressionAttributeValues = {
      ':s': { S: '77' }
    };
  }
  return dynamoDb
    .scan(params)
    .promise()
    .then((result) => {
      return {
        statusCode: 200,
        body: swapi.response({
          results: result.Items
        })
      };
    })
    .catch((err) => {
      return {
        statusCode: 401,
        body: swapi.response(
          {
            result: 'error',
            error: err
          },
          event
        )
      };
    });
};

module.exports.id = async (event) => {
  return swapiPeople
    .obtenerPersonasSw(event.pathParameters.id)
    .then((result) => {
      return {
        statusCode: 200,
        body: swapi.response(result)
      };
    })
    .catch((error) => {
      return {
        statusCode: 404,
        body: swapi.response({
          result: 'No encontrado'
        })
      };
    });
};

module.exports.submit = async (event) => {
  const body = JSON.parse(event.body);
  body.id = uuidv4();
  body.creacion = new Date().toISOString();
  body.edicion = new Date().toISOString();

  const valid = ajv.validate(schema, body);

  if (!valid)
    return {
      statusCode: 401,
      body: swapi.response({ result: 'error', error: ajv.errors })
    };

  const peopleInfo = {
    TableName: process.env.TABLA_PERSONAS,
    Item: body
  };
  await dynamoDb
    .put(peopleInfo)
    .promise()
    .then((res) => {});
  return {
    statusCode: 200,
    body: swapi.response({ result: 'success', item: body })
  };
};

module.exports.schema = async (event) => {
  delete schema.properties.id;
  schema.properties.url = { type: 'string' };
  return {
    statusCode: 200,
    body: swapi.response(schema)
  };
};
