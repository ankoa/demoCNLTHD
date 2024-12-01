import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const QuizAudio = ({
  audioPath,
  questionID,
  handelNext,
  isHidden,
  onAudioEnd,
}) => {
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    if (audioPath && audioRef.current) {
      audioRef.current.play();

      const handleLoadedMetadata = () => {
        setAudioDuration(audioRef.current.duration);
      };

      const handleAudioEnded = () => {
        handelNext(questionID);
        onAudioEnd(); // Thông báo kết thúc audio
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleAudioEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioRef.current.removeEventListener("ended", handleAudioEnded);
        }
      };
    }
  }, [audioPath, handelNext, onAudioEnd, questionID]);

  return (
    <div className={`q-audio ${isHidden ? "hidden" : ""}`}>
      {audioPath ? (
        <>
          <audio ref={audioRef} controls src={audioPath} autoPlay>
            Your browser does not support audio playback.
          </audio>
          <p>Thời gian đoạn audio: {audioDuration.toFixed(2)} giây</p>
        </>
      ) : (
        <p>No audio available.</p>
      )}
    </div>
  );
};

// Prop types validation
QuizAudio.propTypes = {
  audioPath: PropTypes.string.isRequired,
  questionID: PropTypes.number.isRequired,
  handelNext: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  onAudioEnd: PropTypes.func.isRequired, // Prop mới để xử lý hủy component
};

export default QuizAudio;

/* import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const QuizAudio = ({ audioPath, questionID, handelNext, isHidden }) => {
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    if (audioPath && audioRef.current) {
      audioRef.current.play();

      const handleLoadedMetadata = () => {
        setAudioDuration(audioRef.current.duration);
      };

      const handleAudioEnded = () => {
        handelNext(questionID);
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleAudioEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioRef.current.removeEventListener("ended", handleAudioEnded);
        }
      };
    }
  }, [audioPath, handelNext, questionID]);

  return (
    <div className={`q-audio ${isHidden ? "hidden" : ""}`}>
      {audioPath ? (
        <>
          <audio ref={audioRef} controls src={audioPath} autoPlay>
            Your browser does not support audio playback.
          </audio>
          <p>Thời gian đoạn audio: {audioDuration.toFixed(2)} giây</p>
        </>
      ) : (
        <p>No audio available.</p>
      )}
    </div>
  );
};

// Prop types validation
QuizAudio.propTypes = {
  audioPath: PropTypes.string.isRequired,
  questionID: PropTypes.number.isRequired,
  handelNext: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
};

export default QuizAudio;
 */
