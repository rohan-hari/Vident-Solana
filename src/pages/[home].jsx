import Feed from '../components/feed/Feed';
import { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import axios from 'axios';

export default function Home() {
  const { router } = useStateContext();
  const path = router.query.home;
  const url = `/api/videos/${!path ? 'all' : path}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [url]);

  return (
    <div className="p-6">
      <Feed data={data} />
    </div>
  );
}
