const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

function readAllFilms(minimum) {
  let filter;
  if (minimum) {
    filter = minimum;
  }
  let filtr;
  console.log(`minimum value : ${filter ?? 'not requested'}`);

  const films = parse(jsonDbPath);

  if (filter) filtr = [...films].filter((movie) => movie.duration > filter);

  console.log('GET /pizzas');
  return filtr ?? films
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath);
  const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath);

  const createdFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };

  films.push(createdFilm);

  serialize(jsonDbPath, films);

  return createdFilm;
}

function getNextId() {
  const films = parse(jsonDbPath);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
