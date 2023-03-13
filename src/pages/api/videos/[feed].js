import connectDB from '../../../lib/database/connection';
import Video from '../../../lib/database/model/Video';
import { getUser } from '../../../lib/auth';

export default async function handler(req, res) {
  await connectDB();
  const { feed } = req.query;

  // All Videos Randomly Selected --------------------------------------------
  if (feed === 'all') {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(videos);
    } catch (err) {
      res.status(400).json({ error: 'Error on fetching videos' });
    }
  }
  // Trending - Videos sorted by number of views ------------------------------
  else if (feed === 'trending') {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
    } catch (err) {
      res.status(400).json({ error: 'Error on fetching videos' });
    }
  }
  // Subscribd Channel Videos -------------------------------------------------
  else if (feed === 'subscribed') {
    const { data } = (await getUser(req)) || '';
    if (data) {
      try {
        const subChannels = data.subscribedChannels;
        const list = await Promise.all(
          subChannels.map((channelId) => {
            return Video.find({ userId: channelId });
          })
        );
        res
          .status(200)
          .send(list.flat().sort((a, b) => b.createdAt - a.createdAt));
      } catch (err) {
        res.status(400).json({ error: 'Error on fetching videos' });
      }
    } else {
      res.status(400).json({ error: 'Not logged in' });
    }
  }
  // Get similar videos based on Tags -----------------------------------------
  else if (feed === 'tags') {
    const tags = req.query.t.split(',');
    try {
      const videos = await Video.aggregate([
        {
          $addFields: {
            priority: {
              $switch: {
                branches: tags.map((tag, index) => ({
                  case: { $in: [tag, '$tags'] },
                  then: index + 1,
                })),
                default: tags.length + 1,
              },
            },
          },
        },
        {
          $sort: { priority: 1, createdAt: -1 },
        },
      ]);

      res.status(200).json(videos);
    } catch (err) {
      res.status(400).json({ error: 'Error on fetching videos' });
    }
  }
  // Search for videos --------------------------------------------------------
  else if (feed === 'search') {
    const searchQuery = req.query.q;
    try {
      const searchResults = await Video.find({
        title: { $regex: searchQuery, $options: 'i' },
      });
      res.status(200).json(searchResults);
    } catch (err) {
      res.status(400).json({ error: 'Error on fetching videos' });
    }
  } else {
    res.status(400).json({ error: 'Invalid route' });
  }
}
