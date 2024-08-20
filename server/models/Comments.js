const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, default: 'pacijent' },
  comment: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  userName: {type: String},
  replies: {type: Array, default: []}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;