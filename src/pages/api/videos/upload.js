import connectDB from '../../../lib/database/connection';
import Video from '../../../lib/database/model/Video';
import { getUser } from '../../../lib/auth';

const { data } = (await getUser(req)) || '';

export default async function handler(req, res) {
  if (req.method === 'POST' && data) {
    await connectDB();
    const newVideo = new Video({ userId: data.id, ...req.body });
    try {
      const saveVideo = await newVideo.save();
      res.status(200).json(saveVideo);
    } catch (err) {
      res.status(400).json({ error: 'Error Uploading Files' });
    }
  } else {
    res.status(400).json({ error: 'Not allowed' });
  }
}
