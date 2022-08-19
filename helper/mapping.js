'use strict';

const dictionary = {
  birth_year: 'anio_nacimiento',
  eye_color: 'color_ojos',
  films: 'peliculas',
  gender: 'genero',
  hair_color: 'color_cabello',
  height: 'talla',
  homeworld: 'planeta',
  mass: 'masa',
  name: 'nombre',
  skin_color: 'color_piel',
  species: 'especies',
  starships: 'naves',
  vehicles: 'vehiculos',
  created: 'creacion',
  edited: 'edicion',
  url: 'enlace'
};

module.exports.transform = (data) => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [dictionary[key]]: value
    }),
    {}
  );
};
