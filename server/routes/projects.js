var express = require('express');
var passport = require('passport');
const Project = require('../models/project')
const Idea = require('../models/idea')
const Comment = require('../models/comment')
const config = require('../configs/index');

var router = express.Router();

// Route to get all projects
router.get('/', (req, res, next) => {
  Project.find().populate('_owner')
    .then(projects => {
      res.json(projects);
    })
    .catch(err => next(err))
});

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

// // Route to get one project
// router.get('/:id', (req, res, next) => {
//   Project.findById(req.params.id)
//     .then(project => {
//       Idea.find({_project: req.params.id})
//         .then(ideas => {
//           res.json({project, ideas});
//         })
//     })
//     .catch(err => next(err))
// });

// Route to add a project
router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { title, description } = req.body
  Project.create({ title, description, _owner: req.user._id })
    .then(project => {
      res.json({
        success: true,
        project
      });
    })
    .catch(err => next(err))
});

// Route to delete project
router.delete('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .then(project => {
      res.json({
        success: true,
        project
      });
    })
    .catch(err => next(err))
});

// Route to update a project
router.put('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { title, description } = req.body
  Project.findByIdAndUpdate(req.params.id, { title, description })
    .then(project => {
      res.json({
        success: true,
        project
      });
    })
    .catch(err => next(err))
});

module.exports = router;
