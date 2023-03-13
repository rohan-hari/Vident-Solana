import connectDB from '../../../../lib/database/connection';
import Video from '../../../../lib/database/model/Video';
import Comment from '../../../../lib/database/model/Comment';
import { getUser } from '../../../../lib/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const { data } = (await getUser(req)) || '';
  const video = id.length === 24 ? await Video.findById(id) : '';

  if (req.method === 'POST' && video && data) {
    await connectDB();
    const newComment = new Comment({
      userId: data.id,
      videoId: id,
      content: req.body.content,
    });
    try {
      const saveComment = await newComment.save();
      res.status(200).json(saveComment);
    } catch (err) {
      res.status(400).json({ error: 'Error on adding comment' });
    }
  } else if (req.method === 'GET') {
    if (video) {
      try {
        const comments = await Comment.find({ videoId: id });
        res.status(200).json(comments);
      } catch (err) {
        res.status(400).json({ error: 'Error on getting comment' });
      }
    } else {
      res.status(400).json({ error: 'Video not found' });
    }
  } else {
    res.status(400).json({ error: 'Not allowed' });
  }
}
