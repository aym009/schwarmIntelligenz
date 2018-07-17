var express = require('express');
var passport = require('passport');
const Idea = require('../models/idea')
const Comment = require('../models/comment')
const config = require('../configs/index');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

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

// Route to add a text idea
router.post('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let { text, _project } = req.body
  let _comments = []
  Idea.create({ text, _project, _comments, _owner: req.user._id })
    .then(idea => {
      res.json({
        success: true,
        idea
      });
    })
    .catch(err => next(err))
});

// Route to add a photo idea
router.post('/idea-picture/pictures', [parser.single('picture'), passport.authenticate("jwt", config.jwtSession)], (req, res, next) => {
  // console.log(req.body, req.file)
  let _project = req.body.id
  let _comments = []
  Idea.create( { pictureUrl: req.file.url, _project, _comments, _owner: req.user.id })
    .then((data) => {
      console.log("what are u ", data)
      res.json({
        success: true,
        data
      })
    })
});

// Route to delete idea
router.delete('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let ideaId = req.params.id
  Idea.findByIdAndRemove(ideaId)
    .then(idea => {
      let promises = []
      for (let i = 0; i < idea._comments.length; i++) {
        promises.push(Comment.findByIdAndRemove(idea._comments[i]))
      }
      return Promise.all(promises)
    })
    .then(comments => {
      res.json({
        success: true,
        msg: `1 idea deleted and ${comments.length} comments deleted`,
        comments
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
