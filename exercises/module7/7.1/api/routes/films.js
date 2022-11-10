const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname}/../data/films.json`;

/* Read all the movies from the menu
 */
router.get('/', (req, res) => {
  const filter = req?.query?.['minimum-duration'] ? req?.query?.['minimum-duration'] : undefined;
  let filtredMovies;
  console.log(`minimum value : ${filter ?? 'not requested'}`);

  const films = parse(jsonDbPath);

  if (filter) filtredMovies = [...films].filter((movie) => movie.duration > filter);

  console.log('GET /pizzas');
  res.json(filtredMovies ?? films);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /movies/${req.params.id}`);

  const films = parse(jsonDbPath);

  const indexOfMoviesFound = films.findIndex((movies) => movies.id === req.params.id);

  if (indexOfMoviesFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfMoviesFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = typeof req?.body?.duration === 'number' ? req.body.duration : undefined;
  const budget = typeof req?.body?.budget === 'number' ? req.body.budget : undefined;
  const link = typeof req?.body?.link === 'string' ? req.body.link : undefined;

  console.log('POST /pizzas');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const films = parse(jsonDbPath);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(newMovie);

  serialize(jsonDbPath, films);

  return res.json(newMovie);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /movies/${req.params.id}`);

  const films = parse(jsonDbPath);

  const foundIndex = films.findIndex((movie) => movie.id === req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /films');

  if ((!title && !duration) || !budget || !link || title?.length === 0) return res.sendStatus(400);

  const films = parse(jsonDbPath);

  const foundIndex = films.findIndex((movie) => movie.id === req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedMovie = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedMovie;

  serialize(jsonDbPath, films);
  
  return res.json(updatedMovie);
});

module.exports = router;
