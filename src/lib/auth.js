import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/solana';

const users = {};

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_DOMAIN || '',
  wallet: new PrivateKeyWallet(process.env.PRIVATE_KEY || ''),

  callbacks: {
    onLogin: async (address) => {
      if (!users[address]) {
        users[address] = {
          created_at: Date.now(),
          last_login_at: Date.now(),
          num_log_outs: 0,
        };
      } else {
        users[address].last_login_at = Date.now();
      }

      return { role: ['admin'] };
    },
    onUser: async (user) => {
      if (users[user.address]) {
        users[user.address].user_last_accessed = Date.now();
      }

      return users[user.address];
    },
    onLogout: async (user) => {
      if (users[user.address]) {
        users[user.address].num_log_outs++;
      }
    },
  },
});

export default ThirdwebAuthHandler();
