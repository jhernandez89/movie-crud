const express = require('express');

const router = express.Router();
const low = require('lowdb');

const db = low('db/db.json', { storage: require('lowdb/lib/storages/file-async') }); // eslint-disable-line

router.get('/movies', (req, res) => {
  const movies = db.get('movies');
  res.send(movies);
});

router.get('/movies/:id', (req, res) => {
  const singleMovie = db.get('movies').nth(+req.params.id);
  res.send(singleMovie);
});

router.post('/movies', (req, res) => {
  db.get('movies')
    .push(req.body)
    .write()
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put('/movies/:id', (req, res) => {
  console.log(req.body);
  db.get('movies')
  .nth(+req.params.id)
  .assign(req.body)
  .write()
  .then((updatedMovie) => {
    res.send(updatedMovie);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  db.get('movies')
  .remove((movie, index) => index === +req.params.id)
  .write()
  .then((deletedMovie) => {
    res.status(204).send();
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
