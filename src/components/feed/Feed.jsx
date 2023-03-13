import React from 'react';

import VideoCard from './VideoCard';

export default function Feed({ data }) {
  return (
    <div className="flex flex-row">
      <div className="flex grow justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 max-w-screen-2xl">
          {data?.map((post) => (
            <VideoCard
              key={post._id}
              title={post.title}
              imageSrc={post.thumbnail}
              views={post.views}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
