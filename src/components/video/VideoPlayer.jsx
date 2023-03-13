import React from 'react';
import { DefaultPlayer as Player } from 'react-html5video';
import './video-player-styles.css';

export default function VideoPlayer({ url, width, height }) {
  return (
    <>
      <Player
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster="https://static-cse.canva.com/blob/1015210/1600w-wK95f3XNRaM.jpg"
      >
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
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
