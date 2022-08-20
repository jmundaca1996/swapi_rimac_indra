const { loadFeature, defineFeature } = require('jest-cucumber');
//const mock = require('../util/mock');
const { id } = require('../../api/people');

const swapiPeople = require('../../swapi/swapiPeople');

const axios = require('axios');

axios.get = jest.fn().mockImplementation(async (params) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/4/',
          'https://swapi.dev/api/films/5/',
          'https://swapi.dev/api/films/6/'
        ],
        species: ['https://swapi.dev/api/species/2/'],
        vehicles: [],
        starships: [],
        created: '2014-12-10T15:10:51.357000Z',
        edited: '2014-12-20T21:17:50.309000Z',
        url: 'https://swapi.dev/api/people/2/'
      }
    });
  });
});

const feature = loadFeature('../peopleId.feature', {
  loadRelativePath: true,
  errors: true
});

defineFeature(feature, (test) => {
  test('Obteniendo el Paydload para un Id de personaje', ({
    given,
    when,
    then,
    and
  }) => {
    let peopleIdTest, respuesta;

    given(/^el id del personaje (.)$/, (peopleId) => {
      peopleIdTest = peopleId;
    });

    when('estos son consultados en una api externa', async () => {
      const event = {
        pathParameters: {
          id: peopleIdTest
        }
      };
      respuesta = await id(event);
    });

    then('se obtendrá un objeto', () => {
      expect(typeof respuesta).toBe('object');
    });

    then(/^el objeto tendrá tantos elementos: (.*)$/, (cantidadElementos) => {
      expect(Object.keys(respuesta).length).toBe(Number(cantidadElementos));
    });

    then(/^el statusCode: (.*)$/, (statusCode) => {
      expect(respuesta.statusCode).toBe(Number(statusCode));
    });

    then(
      /^el payload tendra la cantidad de elementos: (.*)$/,
      (tamanoPayload) => {
        expect(Object.keys(JSON.parse(respuesta.body)).length).toBe(
          Number(tamanoPayload)
        );
      }
    );
  });
});
