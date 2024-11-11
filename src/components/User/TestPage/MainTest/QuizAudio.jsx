import React, { useRef, useState, useEffect } from "react";

const QuizAudio = ({ audioPath }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Khi audioPath thay đổi, tự động phát âm thanh
    if (audioPath && audioRef.current) {
      audioRef.current.play(); // Tự động phát âm thanh
    }

    // Cleanup để dừng âm thanh khi component bị hủy hoặc audioPath thay đổi
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Dừng âm thanh khi component bị hủy
      }
    };
  }, [audioPath]); // Dependency array, chỉ chạy khi audioPath thay đổi

  return (
    <div className="q-audio">
      {audioPath ? (
        <audio
          ref={audioRef}
          controls
          src={audioPath}
          autoPlay // Đảm bảo rằng âm thanh sẽ tự động phát khi load
        >
          Your browser does not support audio playback.
        </audio>
      ) : (
        <p>No audio available.</p>
      )}
    </div>
  );
};

export default QuizAudio;
