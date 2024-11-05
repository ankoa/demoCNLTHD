import React from "react";
import "./ResultDisplay.scss";
import { GiCheckMark, GiBullseye } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { FaTimesCircle, FaMinusCircle, FaCheckCircle } from "react-icons/fa";

const ResultDisplay = ({ results, startTime, endTime }) => {
  const totalQuestions = results.length;
  const correctAnswers = results.filter((result) => result.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);

  // Calculate the time difference between endTime and startTime
  const timeDiff = new Date(new Date(endTime) - new Date(startTime));
  const formattedTime = `${String(timeDiff.getUTCHours()).padStart(2, '0')}:${String(timeDiff.getUTCMinutes()).padStart(2, '0')}:${String(timeDiff.getUTCSeconds()).padStart(2, '0')}`;

  return (
    <div className="result-display">
      <div className="result-display__header">
        <h2>Kết quả luyện tập:</h2>
        <button>Quay về trang đề thi</button>
      </div>
      <div className="result-display__content">
        <div className="result-display__summary">
          <div className="result-display__summary__element">
            <span> <GiCheckMark color="green" /> Kết quả làm bài </span>
            <strong>{correctAnswers}/{totalQuestions}</strong>
          </div>
          <div className="result-display__summary__element">
            <span> <GiBullseye /> Độ chính xác</span>
            <strong>{accuracy}%</strong>
          </div>
          <div className="result-display__summary__element">
            <span> <MdOutlineTimer color="red" /> Thời gian hoàn thành</span>
            <strong>{formattedTime}</strong>
          </div>
        </div>

        <div className="result-display__stats">
          <div className="result-display__stat correct">
            <FaCheckCircle className="icon" />
            <span>Trả lời đúng</span>
            <strong>{correctAnswers} </strong>
            <span>câu hỏi</span>
          </div>
          <div className="result-display__stat incorrect">
            <FaTimesCircle className="icon" />
            <span>Trả lời sai</span>
            <strong>{incorrectAnswers} </strong>
            <span>câu hỏi</span>
          </div>
          <div className="result-display__stat skipped">
            <FaMinusCircle className="icon" />
            <span>Bỏ qua</span>
            <strong>0</strong>
            <span>câu hỏi</span>
          </div>
        </div>
      </div>

      <div className="answer-list">
        <h3>Đáp án</h3>
        {Object.keys(answers).map((part) => (
          <div key={part} className="part-section">
            <div className="part-title">Part {part}</div>
            <div className="answer-grid">
              {answers[part].map((item) => (
                <div key={item.questionNumber} className="answer-item">
                  <div className="question-number">{item.questionNumber}</div>
                  <div className="answer-choice">{item.userAnswer}:</div>
                  <div
                    className={`correct-answer ${item.userAnswer === item.correctAnswer ? "correct" : "incorrect"
                      }`}
                  >
                    {item.correctAnswer}
                  </div>
                  {item.userAnswer === item.correctAnswer ? (
                    <span className="correct-icon">✔️</span>
                  ) : (
                    <span className="incorrect-icon">❌</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const answers = {
  "1": [
    { questionNumber: 1, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 2, userAnswer: "C", correctAnswer: "Đ" },
    { questionNumber: 3, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 4, userAnswer: "C", correctAnswer: "Đ" },
    { questionNumber: 5, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 6, userAnswer: "C", correctAnswer: "Đ" },
    { questionNumber: 7, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 8, userAnswer: "C", correctAnswer: "Đ" },
    { questionNumber: 9, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 10, userAnswer: "C", correctAnswer: "Đ" },
    { questionNumber: 11, userAnswer: "D", correctAnswer: "D" },
    { questionNumber: 12, userAnswer: "C", correctAnswer: "Đ" },
    // Thêm các câu hỏi khác của Part 1
  ],
  "5": [
    { questionNumber: 101, userAnswer: "C", correctAnswer: "C" },
    { questionNumber: 102, userAnswer: "B", correctAnswer: "Đ" },
    // Thêm các câu hỏi khác của Part 5
  ],
  // Thêm các phần khác
};

export default ResultDisplay;
