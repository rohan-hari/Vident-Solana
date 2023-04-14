import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import TronWeb from 'tronweb';

export default async function handler(req, res) {
  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
  });

  if (req.method === 'POST') {
    try {
      const { signature, address, nonce } = req.body;

      if (!tronWeb.isAddress(address)) {
        res.status(400).send('Not a valid address');
      }

      const message = {
        domain: 'http://localhost:3000',
        address: address,
        statement: 'Sign in using TronLink',
        version: 1,
        nonce: nonce,
      };

      const verifySignature = await tronWeb.trx.verifyMessage(
        tronWeb.toHex(message),
        signature,
        address
      );

      if (verifySignature) {
        const token = jwt.sign({ address }, process.env.JWT_SECRET);
        res.setHeader(
          'Set-Cookie',
          serialize('access_token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 3, // 3d
          })
        );

        res.status(200).send('Signin successfull');
      }
    } catch (err) {
      res.status(401).send('Error on authenticating');
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
