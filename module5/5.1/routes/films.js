var express = require("express");
const {serialize, parse} = require('../utils/json')
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const MOVIES = [
  {
    id: 1,
    title: "Avengers",
    duration: 112,
    budget: 112000,
    link: "http",
  },
  {
    id: 2,
    title: "Soprano",
    duration: 150,
    budget: 112000,
    link: "http",
  },
  {
    id: 3,
    title: "Pouf",
    duration: 183,
    budget: 112000,
    link: "http",
  },
  {
    id: 4,
    title: "Ila",
    duration: 98,
    budget: 112000,
    link: "http",
  },
  {
    id: 5,
    title: "Passef",
    duration: 80,
    budget: 112000,
    link: "http",
  },
];

/* Read all the movies from the menu
 */
router.get("/", (req, res, next) => {
  const filter = req?.query?.["minimum-duration"]
    ? req?.query?.["minimum-duration"]
    : undefined;
  let filtredMovies;
  console.log(`minimum value : ${filter ?? "not requested"}`);
  if (filter)
    filtredMovies = [...MOVIES].filter((movie) => movie.duration > filter);

  console.log("GET /pizzas");
  res.json(filtredMovies ?? MOVIES);
});

// Read the pizza identified by an id in the menu
router.get("/:id", (req, res) => {
  console.log(`GET /movies/${req.params.id}`);

  const indexOfMoviesFound = MOVIES.findIndex(
    (movies) => movies.id == req.params.id
  );

  if (indexOfMoviesFound < 0) return res.sendStatus(404);

  res.json(MOVIES[indexOfMoviesFound]);
});

// Create a pizza to be added to the menu.
router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = typeof req?.body?.duration === 'number' ? req.body.duration : undefined;
  const budget = typeof req?.body?.budget === 'number' ? req.body.budget : undefined;
  const link = typeof req?.body?.link === "string" ? req.body.link : undefined;

  console.log("POST /pizzas");

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MOVIES[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  MOVIES.push(newMovie);

  res.json(newMovie);
});

// Delete a pizza from the menu based on its id
router.delete("/:id", (req, res) => {
  console.log(`DELETE /movies/${req.params.id}`);

  const foundIndex = MOVIES.findIndex((movie) => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = MOVIES.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch("/:id", (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log("POST /films");

  if ((!title && !duration) || !budget || !link || title?.length === 0)
    return res.sendStatus(400);

  const foundIndex = MOVIES.findIndex((movie) => movie.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedMovie = { ...MOVIES[foundIndex], ...req.body };

  MOVIES[foundIndex] = updatedMovie;

  res.json(updatedMovie);
});

module.exports = router;
