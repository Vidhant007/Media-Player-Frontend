import React, { useRef, useState } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  function changeQuality(quality) {
    const video = videoRef.current;
    const currentQuality = video.src.split('/').pop();
    setCurrentTime(video.currentTime);

    video.src = `http://localhost:8000/${quality}`;
    video.load();
    video.currentTime = currentTime;
    video.play();
  }

  return (
    <div>
      <video
        id="videoPlayer"
        width="650"
        controls
        muted
        autoPlay
        ref={videoRef}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      >
        <source src="" type="video/mp4" />
      </video>

      <button onClick={() => changeQuality('360p')}>360p</button>
      <button onClick={() => changeQuality('540p')}>540p</button>
      <button onClick={() => changeQuality('720p')}>720p</button>
    </div>
  );
}

export default VideoPlayer;