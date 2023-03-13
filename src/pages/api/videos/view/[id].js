import connectDB from '../../../../lib/database/connection';
import Video from '../../../../lib/database/model/Video';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // View video and increment views -------------------------------------------
  try {
    await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });
    const video = await Video.findById(id);
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: 'Error' });
  }
}
