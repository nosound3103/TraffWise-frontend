// import React from "react";
// import "./PlaybackControl.css";

// export default function PlaybackControls() {
//   return (
//     <div className="playback-controls">
//       <button className="playback-btn">&laquo;</button>
//       <button className="playback-btn">&#9654;</button>
//       <button className="playback-btn">&raquo;</button>
//     </div>
//   );
// }

import React from "react";
import "./PlaybackControl.css";

export default function PlaybackControls({ videoRef }) {
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5; // Rewind 5 seconds
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5; // Fast-forward 5 seconds
    }
  };

  return (
    <div className="playback-controls">
      <button className="playback-btn" onClick={handleRewind}>
        &laquo;
      </button>
      <button className="playback-btn" onClick={handlePlayPause}>
        &#9654;
      </button>
      <button className="playback-btn" onClick={handleFastForward}>
        &raquo;
      </button>
    </div>
  );
}
