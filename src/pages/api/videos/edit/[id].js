import { verifyToken } from '../../../../lib/auth';
import connectDB from '../../../../lib/database/connection';
import Video from '../../../../lib/database/model/Video';

async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  const user = req.user;

  const video = await Video.findById(id);
  if (!video) res.status(400).json({ error: 'Video not found' });

  // Edit Video data by Id ----------------------------------------------------
  if (req.method === 'PUT') {
    try {
      if (video.userId === user.id) {
        const updatedVideo = await Video.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else res.status(400).json({ error: 'Not authenticated' });
    } catch (err) {
      res.status(400).json({ error: 'Error updating video' });
    }
  }
  // Delete Video by Id -----------------------------------------------------
  else if (req.method === 'DELETE') {
    try {
      if (video.userId === user.id) {
        await Video.findByIdAndDelete(id);
        res.status(200).json('Video deleted');
      } else res.status(400).json({ error: 'Not authenticated' });
    } catch (err) {
      res.status(400).json({ error: 'Error deleting video' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default verifyToken(handler);
