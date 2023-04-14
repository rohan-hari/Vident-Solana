import { verifyToken } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.send(req.user);
}

export default verifyToken(handler);
