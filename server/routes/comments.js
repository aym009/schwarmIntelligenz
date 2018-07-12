var express = require('express');
const Comment = require('../models/comment')

var router = express.Router();

// Route to get all comments link to idea id
router.get('/:ideaId', (req, res, next) => {
  Comment.find( { '_idea': req.params.ideaId } )
    .then(comments => {
      res.json(comments);
    })
    .catch(err => next(err))
});

// Route to add a comment link to idea id
router.post('/:ideaId', (req, res, next) => {
  let { text } = req.body
  let _idea = req.params.ideaId
  Comment.create({ text, _idea })
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err))
});

// Route to delete comment
router.delete('/:id', (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err))
});

// Route to update a comment
router.put('/:id', (req, res, next) => {
  let { text } = req.body
  Comment.findByIdAndUpdate(req.params.id, { text })
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err))
});

module.exports = router;
