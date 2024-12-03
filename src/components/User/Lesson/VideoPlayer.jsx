import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoId, thumbnailUrl }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    if (isVideoLoaded) {
      // Tải API YouTube Iframe khi video được yêu cầu phát
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoId,
          events: {
            'onReady': onPlayerReady,
          },
        });
      };
    }
  }, [isVideoLoaded, videoId]);

  const onPlayerReady = (event) => {
    document.getElementById('loadVideoButton').addEventListener('click', () => {
      event.target.playVideo();
    });
  };

  return (
    <div>
      {!isVideoLoaded ? (
        <div>
          <a href="#!" onClick={handlePlayClick}>
            <img src={thumbnailUrl} alt="Click to watch the video" />
          </a>
          <button id="loadVideoButton">Play Video</button>
        </div>
      ) : (
        <div id="player"></div>
      )}
    </div>
  );
};

export default VideoPlayer;
