import connectDB from '../../../../lib/database/connection';
import Video from '../../../../lib/database/model/Video';
import Channel from '../../../../lib/database/model/Channel';
import { getUser } from '../../../../lib/auth';

export default async function handler(req, res) {
  await connectDB();
  const { action, id } = req.query;
  const { data } = (await getUser(req)) || '';

  const channel = id.length === 24 ? await Channel.findById(id) : '';
  const video = id.length === 24 ? await Video.findById(id) : '';

  //Subscribe to a channel ----------------------------------------------------
  if (action === 'sub') {
    try {
      if (channel && data.id !== id) {
        await Channel.findByIdAndUpdate(data.id, {
          $addToSet: { subscribedChannels: id },
        });
        res.status(200).json('Subscribed');
      } else res.status(400).json({ error: 'Error subscribing' });
    } catch (err) {
      res.status(400).json({ error: 'Error subscribing' });
    }
  }
  //Unsubscribe to a channel --------------------------------------------------
  else if (action === 'unsub') {
    try {
      if (channel && data?.subscribedChannels.includes(id)) {
        await Channel.findByIdAndUpdate(id, {
          $pull: { subscribedChannels: id },
        });
        res.status(200).json('Unsubscribed');
      } else res.status(400).json({ error: 'Error unsubscribing' });
    } catch (err) {
      res.status(400).json({ error: 'Error unsubscribing' });
    }
  }
  //Like a video --------------------------------------------------------------
  else if (action === 'like') {
    try {
      if (video && data) {
        await Video.findByIdAndUpdate(id, {
          $addToSet: { likes: data.id },
          $pull: { dislikes: data.id },
        });
        res.status(200).json('Liked video');
      } else res.status(400).json({ error: 'Error liking video' });
    } catch (err) {
      res.status(400).json({ error: 'Error liking video' });
    }
  }
  //DisLike a video -----------------------------------------------------------
  else if (action === 'dislike') {
    try {
      if (video && data) {
        await Video.findByIdAndUpdate(id, {
          $addToSet: { dislikes: data.id },
          $pull: { likes: data.id },
        });
        res.status(200).json('Disliked video');
      } else res.status(400).json({ error: 'Error disliking video' });
    } catch (err) {
      res.status(400).json({ error: 'Error disliking video' });
    }
  }
  //Remove Video Like --------------------------------------------------------------
  else if (action === 'removeLike') {
    try {
      if (video && data) {
        await Video.findByIdAndUpdate(id, {
          $pull: { likes: data.id },
        });
        res.status(200).json('Removed Like');
      } else res.status(400).json({ error: 'Error' });
    } catch (err) {
      res.status(400).json({ error: 'Error' });
    }
  }
  //Remove Video Like --------------------------------------------------------------
  else if (action === 'removeDislike') {
    try {
      if (video && data) {
        await Video.findByIdAndUpdate(id, {
          $pull: { dislikes: data.id },
        });
        res.status(200).json('Removed Dislike');
      } else res.status(400).json({ error: 'Error' });
    } catch (err) {
      res.status(400).json({ error: 'Error' });
    }
  } else {
    res.status(400).json({ error: 'Not allowed' });
  }
}
