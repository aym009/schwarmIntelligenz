const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  member: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  statusOpen: Boolean
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;