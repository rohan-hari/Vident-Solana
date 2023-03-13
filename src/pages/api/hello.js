import connectDB from '../../lib/database/connection';
import Post from '../../lib/database/Post';

export default async function get_User(req, res) {
  await connectDB();
  const posts = await Post.find({});
  res.status(200).json(posts);
}

// import clientPromise from '../../lib/database/connection';

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db('vident-solana');

//     const movies = await db.collection('posts').find({}).toArray();

//     res.json(movies);
//   } catch (e) {
//     console.error(e);
//   }
// };
