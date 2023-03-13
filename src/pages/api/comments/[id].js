import connectDB from '../../../lib/database/connection';
import Comment from '../../../lib/database/model/Comment';
import { getUser } from '../../../lib/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const { data } = (await getUser(req)) || '';
  const comment = id.length === 24 ? await Comment.findById(id) : '';

  if (req.method === 'DELETE' && comment && data) {
    await connectDB();
    try {
      if (data.id == comment.userId) {
        await Comment.findByIdAndDelete(id);
        res.status(200).json('Comment has been delted');
      } else {
        res.status(400).json({ error: 'Not allowed' });
      }
    } catch (err) {
      res.status(400).json({ error: 'Error deleting comment' });
    }
  } else {
    res.status(400).json({ error: 'Not allowed' });
  }
}
