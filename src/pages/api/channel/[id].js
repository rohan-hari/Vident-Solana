import connectDB from '../../../lib/database/connection';
import Channel from '../../../lib/database/model/Channel';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // View Channel details by id --------------------------------------------------
  if (req.method === 'GET') {
    try {
      const channel = await Channel.findById(id);
      res.status(200).json(channel);
    } catch (err) {
      res.status(400).json({ error: 'Error finding the channel' });
    }
  }
  // Edit Channel by id ----------------------------------------------------------
  else if (req.method === 'PUT') {
    await verifyToken(async (req, res) => {
      const user = req.user;
      if (id === user.id) {
        try {
          const updatedChannelData = await Channel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json(updatedChannelData);
        } catch (err) {
          res.status(400).json({ error: 'Error updating channel data' });
        }
      } else {
        res.status(400).json({ error: 'Not authenticated' });
      }
    })(req, res);
  }
  // Delete Channel by id --------------------------------------------------------
  // else if (req.method === 'DELETE') {
  //   if (id === data?.id) {
  //     try {
  //       await Channel.findByIdAndDelete(id);
  //       res.status(200).json({ success: 'Channel has been deleted' });
  //     } catch (err) {
  //       res.status(400).json({ error: 'Error deleting video' });
  //     }
  //   } else {
  //     res.status(400).json({ error: 'Not authenticated' });
  //   }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
