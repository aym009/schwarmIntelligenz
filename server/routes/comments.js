var express = require('express');
const Comment = require('../models/comment')

var router = express.Router();

// Route to get all comments
router.get('/', (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => next(err))
});

// Route to add a comment
router.post('/', (req, res, next) => {
  let {text} = req.body
  Comment.create({text})
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err))
});

module.exports = router;
