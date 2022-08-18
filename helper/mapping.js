'use strict';

const dictionary = { name: 'nombre', age: 'edad' };

module.exports.mapping = async (data) => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [dictionary[key]]: value
    }),
    {}
  );
};
