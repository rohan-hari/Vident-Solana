import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    visibility: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },

    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

let Post;

try {
  Post = mongoose.model('Post');
} catch {
  Post = mongoose.model('Post', PostSchema);
}

export default Post;
