import axios from 'axios';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import connectDB from '../lib/database/connection';
import Channel from '../lib/database/model/Channel';

const createNonceGenerator = () => {
  let nonce = null;

  const generateNonce = () => {
    nonce = crypto.randomBytes(16).toString('hex');
    return nonce;
  };

  const fetchNonce = () => {
    return generateNonce();
  };

  const authenticate = async (signature, address) => {
    return await axios.post('/api/auth', { signature, address, nonce });
  };

  return {
    fetchNonce,
    authenticate,
  };
};

export const verifyToken = (handler) => {
  return async function (req, res, next) {
    const token = req.cookies.access_token;
    if (!token) res.status(401).send('Unauthorized');
    else {
      try {
        const { address } = jwt.verify(token, process.env.JWT_SECRET);
        if (address) {
          await connectDB();
          req.user = await Channel.findOne({ walletAddress: address });
          if (!req.user) {
            const newUser = new Channel({
              name: address,
              walletAddress: address,
            });
            newUser.save();
            req.user = newUser;
          }
        }
        await handler(req, res, next);
      } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid authorization token' });
      }
    }
  };
};

const nonceGenerator = createNonceGenerator();
export const fetchNonce = nonceGenerator.fetchNonce;
export const authenticate = nonceGenerator.authenticate;
