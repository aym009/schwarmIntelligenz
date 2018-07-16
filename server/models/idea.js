const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  text: String,
  pictureUrl: String,
  _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
  _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  position: [ Number ]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;