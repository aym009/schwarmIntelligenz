const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _idea: {type: mongoose.Schema.Types.ObjectId, ref: 'Idea'}  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;