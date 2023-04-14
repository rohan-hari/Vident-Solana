import React, { useEffect } from 'react';
import { DefaultPlayer as Player } from 'react-html5video';

export default function VideoPlayer({ videoUrl, thumbnail }) {
  return (
    <>
      <Player
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster={thumbnail}
      >
        <source src={videoUrl} />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://source.vtt"
          default
        />
      </Player>
    </>
  );
}
