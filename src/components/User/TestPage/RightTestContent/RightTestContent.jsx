import PropTypes from "prop-types";
import "./RightTestContent.scss"; // Import file CSS
import CountDown from "./CountDown"; // Import CountDown component
import { getAllPartByTestID } from "../../../../services/testsService";
import { useState, useEffect } from "react";

const RightTestContent = (props) => {
  const { quizData, testData, handelFinishQuiz } = props; // Destructure props
  const [partData, setPartsData] = useState([]);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    if (testData?.Id) {
      fetchAllPartsData();
    }
  }, [testData]); // Add dependency for testData

  const fetchAllPartsData = async () => {
    try {
      const response = await getAllPartByTestID(testData.Id);

      if (response.EC === 0 && Array.isArray(response.DT.parts)) {
        // Sort parts by Number
        const sortedParts = response.DT.parts.sort(
          (a, b) => a.Number - b.Number
        );

        // Get `parts` from `location.state`, defaulting to undefined
        const { parts } = location.state || {};

        // Filter parts if `parts` exist, otherwise show all
        const partsToShow = parts
          ? sortedParts.filter((part) => parts[`part${part.Number}`])
          : sortedParts;

        setPartsData(partsToShow);
      } else {
        setError("Failed to fetch parts data due to invalid response.");
      }
    } catch (error) {
      console.error("Error fetching parts data:", error);
      setError("An error occurred while fetching parts data.");
    }
  };

  const onTimeUp = () => {
    handelFinishQuiz();
  };

  // Check if the input data is valid
  if (!quizData || !quizData.length) {
    return <div>No questions available.</div>;
  }

  // Determine the class for each question
  const getClassQuestion = (index, quizData) => {
    if (quizData && quizData.length > 0) {
      const isAnswered = quizData.some((a) => a.isSelected);
      return isAnswered ? "question-number selected" : "question-number";
    }
    return "question-number";
  };

  return (
    <>
      <div className="main-timer">
        Thời gian còn lại:
        <CountDown duration={testData?.Duration} onTimeUp={onTimeUp} />
      </div>
      <button
        className="btn-finish mb-3"
        onClick={handelFinishQuiz}
        type="button"
      >
        Nộp bài
      </button>

      <div className="main-question px-4">
        {partData.length > 0 ? (
          (() => {
            let currentIndex = 1; // Bắt đầu đếm từ 1
            return partData.map((part) => {
              const filteredQuestions = quizData.filter(
                (qdata) => qdata.question.PartID === part.Id
              );

              // Chỉ render nếu có câu hỏi
              if (filteredQuestions.length === 0) return null;

              return (
                <div key={part.Id}>
                  <div className="part-title">
                    Part {part.Number}: {part.Text}
                  </div>
                  <div className="questions-container ps-4">
                    {filteredQuestions.map((qdata) => (
                      <div
                        key={qdata.question.Id}
                        className={`question-number ${getClassQuestion(
                          currentIndex - 1,
                          qdata.answers
                        )}`}
                      >
                        {currentIndex++}
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()
        ) : (
          <div>Loading parts...</div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </>
  );
};

// Define prop types
RightTestContent.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.shape({
        AnswerCounts: PropTypes.number.isRequired,
        AudioName: PropTypes.string,
        AudioPath: PropTypes.string,
        CreatedAt: PropTypes.string.isRequired,
        Id: PropTypes.number.isRequired,
        ImageName: PropTypes.string,
        ImagePath: PropTypes.string,
        PartID: PropTypes.number.isRequired,
        Text: PropTypes.string.isRequired,
        UpdatedAt: PropTypes.string.isRequired,
      }).isRequired,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          Id: PropTypes.number.isRequired,
          QuestionID: PropTypes.number.isRequired,
          Text: PropTypes.string.isRequired,
          IsCorrect: PropTypes.bool.isRequired,
          isSelected: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  testData: PropTypes.shape({
    Id: PropTypes.number,
    Duration: PropTypes.number,
  }).isRequired,
  handelFinishQuiz: PropTypes.func.isRequired,
};

export default RightTestContent;
