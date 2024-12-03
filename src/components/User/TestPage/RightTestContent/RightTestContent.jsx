import PropTypes from "prop-types";
import "./RightTestContent.scss"; // Import file CSS
import CountDown from "./CountDown"; // Import CountDown component

const RightTestContent = (props) => {
  const { quizData, testData } = props; // Destructure testData from props
  console.log("quizData->>>>>>>>>>>>>: ", quizData);

  const onTimeUp = () => {
    props.handelFinishQuiz();
  };

  // Check if the input data is valid
  if (!quizData || !quizData.length) {
    return <div>No questions available.</div>;
  }

  // Determine the class for each question
  const getClassQuestion = (index, quizData) => {
    if (quizData.answers && quizData.answers.length > 0) {
      let isUnAnswered = quizData.answers.some((a) => a.isSelected === false);
      if (!isUnAnswered) {
        return "question-number selected";
      }
    }
    return "question-number";
  };

  return (
    <>
      <div className="main-timer">
        {/* Pass the Duration from testData as a prop to CountDown */}
        <CountDown duration={testData.Duration} onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {quizData.map((item, index) => (
          <div
            key={item.question.Id}
            className={getClassQuestion(index, item.answers)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

// Define prop types for RightTestContent
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
          isSelected: PropTypes.bool.isRequired, // Ensure 'isSelected' exists
        })
      ).isRequired,
    })
  ).isRequired,
  testData: PropTypes.shape({
    Duration: PropTypes.number.isRequired, // Add the prop type for Duration
  }).isRequired,
  handelFinishQuiz: PropTypes.func.isRequired, // Define prop type for the function
};

export default RightTestContent;
