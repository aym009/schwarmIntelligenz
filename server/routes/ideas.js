var express = require('express');
const Idea = require('../models/idea')

var router = express.Router();

// Route to get all ideas
router.get('/', (req, res, next) => {
  Idea.find()
    .then(ideas => {
      res.json(ideas);
    })
    .catch(err => next(err))
});

// Route to add a idea
router.post('/', (req, res, next) => {
  let {text, pictureUrl} = req.body
  Idea.create({text, pictureUrl})
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

module.exports = router;
