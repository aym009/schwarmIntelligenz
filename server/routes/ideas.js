var express = require('express');
var passport = require('passport');
const Idea = require('../models/idea')
const Comment = require('../models/comment')
const config = require('../configs/index');

var router = express.Router();

// Route to get all ideas link to project id
router.get('/:projectId', (req, res, next) => {
  Idea.find( { '_project': req.params.projectId } )
    .then(ideas => {
      return res.json(ideas);
    })
    .catch(err => next(err))
});

// // Route to get one idea
// router.get('/:ideaId', (req, res, next) => {
//   Idea.findById(req.params.ideaId)
//     .then(idea => {
//       Comment.find({_idea: req.params.ideaId})
//         .then(comments => {
//           console.log({idea, comments})
//           res.json({idea, comments});
//         })
//     })
//     .catch(err => next(err))
// });

// Route to add a idea
router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { text, pictureUrl, _project } = req.body
  let _comments = []
  Idea.create({ text, pictureUrl, _project, _comments, _owner: req.user._id })
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

// Route to delete idea
router.delete('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Idea.findByIdAndRemove(req.params.id)
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

// Route to update a idea
router.put('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { text, pictureUrl, _comments } = req.body
  Idea.findByIdAndUpdate(req.params.id, { text, pictureUrl, _comments })
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

module.exports = router;
