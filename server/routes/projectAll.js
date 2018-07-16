var express = require('express');
// var passport = require('passport');
const Project = require('../models/project')
const Idea = require('../models/idea')
// const config = require('../configs/index');

var router = express.Router();

// Route to get one project
router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      Idea.find({_project: req.params.id})
        .then(ideas => {
          res.json({project, ideas});
        })
    })
    .catch(err => next(err))
});

module.exports = router;