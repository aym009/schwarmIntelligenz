var express = require('express');
var passport = require('passport');
const Comment = require('../models/comment')
const Idea = require('../models/idea')

const config = require('../configs/index');

var router = express.Router();

// Route to get all comments link to idea id
router.get('/:ideaId', (req, res, next) => {
  Comment.find( { '_idea': req.params.ideaId } )
    .then(comments => {
      res.json(comments);
    })
    .catch(err => next(err))
});

// Route to add a comment
router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { text, _project, _idea } = req.body
  let ideaId = req.params.ideaId;
  Comment.create({ text, _project ,_idea, _owner: req.user._id })
    .then(comment => {
      Idea.findByIdAndUpdate(_idea, {$push: {_comments: comment}})
      .then(idea => console.log(idea))

      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err))
});

// Route to delete comment
router.delete('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let commentId = req.params.id
  Comment.findByIdAndRemove(commentId)
    .then(comment => {
      return Idea.findById(comment._idea)
    })
    .then(idea => {
      idea._comments = idea._comments.filter(e => e.toString() !== commentId)
      return idea.save()
    })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch(err => next(err))
});

// Route to update a comment
router.put('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
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
