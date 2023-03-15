import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/solana';
import Channel from './database/model/Channel';
import connectDB from './database/connection';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_DOMAIN || '',
  wallet: new PrivateKeyWallet(process.env.PRIVATE_KEY || ''),

  callbacks: {
    onLogin: async (address) => {
      const channel = await Channel.findOne({ walletAddress: address });
      if (!channel) {
        const newChannel = new Channel({
          name: address,
          walletAddress: address,
        });
        newChannel.save();
      }
      return { last_login_at: Date.now() };
    },
    onUser: async (user) => {
      const loggedUser = await Channel.findOne({ walletAddress: user.address });
      return loggedUser;
    },
  },
});

export default ThirdwebAuthHandler();
