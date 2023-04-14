import connectDB from '../../../lib/database/connection';
import Video from '../../../lib/database/model/Video';
import { verifyToken } from '../../../lib/auth';

async function handler(req, res) {
  const user = req.user;
  if (req.method === 'POST') {
    await connectDB();
    const newVideo = new Video({ userId: user.id, ...req.body });
    try {
      const saveVideo = await newVideo.save();
      res.status(200).json(saveVideo);
    } catch (err) {
      res.status(400).json({ error: 'Error Uploading Files' });
    }
  } else {
    res.status(400).json({ error: 'Method not allowed' });
  }
}

export default verifyToken(handler);
