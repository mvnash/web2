const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const MOVIES = [
  {
    id: 1,
    title: 'Avengers',
    duration: 112,
    budget: 112000,
    link: 'http',
  },
  {
    id: 2,
    title: 'Soprano',
    duration: 150,
    budget: 112000,
    link: 'http',
  },
  {
    id: 3,
    title: 'Pouf',
    duration: 183,
    budget: 112000,
    link: 'http',
  },
  {
    id: 4,
    title: 'Ila',
    duration: 98,
    budget: 112000,
    link: 'http',
  },
  {
    id: 5,
    title: 'Passef',
    duration: 80,
    budget: 112000,
    link: 'http',
  },
];

function readAllFilms(minimum) {
  let filter;
  if (minimum) {
    filter = minimum;
  }
  let filtredMovies;
  console.log(`minimum value : ${filter ?? 'not requested'}`);

  const films = parse(jsonDbPath, MOVIES);

  if (filter) filtredMovies = [...films].filter((movie) => movie.duration > filter);

  console.log('GET /pizzas');
  return filtredMovies ?? films
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, MOVIES);
  const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath, MOVIES);

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
  const films = parse(jsonDbPath, MOVIES);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, MOVIES);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, MOVIES);
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
