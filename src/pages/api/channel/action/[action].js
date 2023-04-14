import connectDB from '../../../../lib/database/connection';
import Video from '../../../../lib/database/model/Video';
import Channel from '../../../../lib/database/model/Channel';
import { verifyToken } from '../../../../lib/auth';

async function handler(req, res) {
  await connectDB();
  const { action, id } = req.query;
  const user = req.user;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const channel = id.length === 24 ? await Channel.findById(id) : '';
  const video = id.length === 24 ? await Video.findById(id) : '';

  //Subscribe to a channel ----------------------------------------------------
  if (action === 'sub') {
    if (channel) {
      try {
        if (user.id !== id) {
          await Channel.findByIdAndUpdate(user.id, {
            $addToSet: { subscribedChannels: id },
          });
          res.status(200).json('Subscribed');
        } else
          res.status(400).json({ error: 'Cannot subscribe your own channel' });
      } catch (err) {
        res.status(400).json({ error: 'Error subscribing' });
      }
    } else res.status(400).json({ error: 'Channel not found' });
  }
  //Unsubscribe to a channel --------------------------------------------------
  else if (action === 'unsub') {
    if (channel) {
      try {
        if (user.subscribedChannels.includes(id)) {
          await Channel.findByIdAndUpdate(user.id, {
            $pull: { subscribedChannels: id },
          });
          res.status(200).json('Unsubscribed');
        } else
          res.status(400).json({ error: 'Channel not in subscribed list' });
      } catch (err) {
        res.status(400).json({ error: 'Error unsubscribing' });
      }
    } else res.status(400).json({ error: 'Channel not found' });
  }
  //Like a video --------------------------------------------------------------
  else if (action === 'like') {
    if (video) {
      try {
        await Video.findByIdAndUpdate(id, {
          $addToSet: { likes: user.id },
          $pull: { dislikes: user.id },
        });
        res.status(200).json('Liked video');
      } catch (err) {
        res.status(400).json({ error: 'Error liking video' });
      }
    } else res.status(400).json({ error: 'Video not found' });
  }
  //DisLike a video -----------------------------------------------------------
  else if (action === 'dislike') {
    if (video) {
      try {
        await Video.findByIdAndUpdate(id, {
          $addToSet: { dislikes: user.id },
          $pull: { likes: user.id },
        });
        res.status(200).json('Disliked video');
      } catch (err) {
        res.status(400).json({ error: 'Error disliking video' });
      }
    } else res.status(400).json({ error: 'Video not found' });
  }
  //Remove Video Like --------------------------------------------------------------
  else if (action === 'rev-like') {
    if (video) {
      try {
        await Video.findByIdAndUpdate(id, {
          $pull: { likes: user.id },
        });
        res.status(200).json('Removed Like');
      } catch (err) {
        res.status(400).json({ error: 'Error removing like' });
      }
    } else res.status(400).json({ error: 'Video not found' });
  }
  //Remove Video Dislike --------------------------------------------------------------
  else if (action === 'rev-dislike') {
    if (video) {
      try {
        await Video.findByIdAndUpdate(id, {
          $pull: { dislikes: user.id },
        });
        res.status(200).json('Removed Dislike');
      } catch (err) {
        res.status(400).json({ error: 'Error' });
      }
    } else res.status(400).json({ error: 'Video not found' });
  } else {
    res.status(400).json({ error: 'Error removing dislike' });
  }
}

export default verifyToken(handler);
