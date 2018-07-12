var express = require('express');
const Project = require('../models/project')

var router = express.Router();

// Route to get all projects
router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => next(err))
});

// Route to add a project
router.post('/', (req, res, next) => {
  let {title, description} = req.body
  Project.create({title, description})
    .then(project => {
      res.json({
        success: true,
        project
      });
    })
    .catch(err => next(err))
});

module.exports = router;
