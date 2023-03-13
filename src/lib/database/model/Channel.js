import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-RaUPPWU-0D5BxG04HUhzjxepBxtjb5Y9L_CoqAj3iMIWqts73s6SYCmdA7pTZBfLeE&usqp=CAU',
    },
    coverImg: {
      type: String,
      default:
        'https://wallpapers.com/images/high/2048x1152-aesthetic-wallpaper-uzhipcjjms95ckli.webp',
    },
    about: {
      type: String,
      default: 'Welcome to my channel',
    },
    subscribedChannels: {
      type: [String],
    },
    unlockedContent: {
      type: [String],
    },
  },
  { timestamps: true }
);

let Channel;
try {
  Channel = mongoose.model('Channel');
} catch {
  Channel = mongoose.model('Channel', ChannelSchema);
}

export default Channel;
