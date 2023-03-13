import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    videoId: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

let Comment;

try {
  Comment = mongoose.model('Comment');
} catch {
  Comment = mongoose.model('Comment', CommentSchema);
}

export default Comment;
