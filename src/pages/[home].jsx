import { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import Feed from '../components/feed/Feed';
import axios from 'axios';

export default function Home() {
  const { router, setIsLoading } = useStateContext();
  const path = router.query.home;
  const url = `/api/videos/${!path ? 'all' : path}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [url, path]);

  return (
    <div className=" p-6">
      <Feed data={data} />
    </div>
  );
}
