var express = require('express');
var passport = require('passport');
const Idea = require('../models/idea')
const config = require('../configs/index');

var router = express.Router();

// Route to get all ideas link to project id
router.get('/:projectId', (req, res, next) => {
  Idea.find( { '_project': req.params.projectId } )
    .then(ideas => {
      console.log(ideas)
      return res.json(ideas);
    })
    .catch(err => next(err))
});

// Route to add a idea link to project id
router.post('/:projectId', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { text, pictureUrl } = req.body
  let _project = req.params.projectId
  Idea.create({ text, pictureUrl, _project, _owner: req.user._id })
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

// Route to delete idea
router.delete('/:id', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
  let { text, pictureUrl } = req.body
  Idea.findByIdAndUpdate(req.params.id, { text, pictureUrl })
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

module.exports = router;
