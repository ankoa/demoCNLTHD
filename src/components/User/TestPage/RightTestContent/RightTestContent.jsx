import PropTypes from "prop-types";
import "./RightTestContent.scss"; // Import file CSS
import CountDown from "./CountDown"; // Import file CSS

const RightTestContent = (props) => {
  const { quizData } = props;

  const onTimeUp = () => {
    props.handelFinishQuiz();
  };

  // Kiểm tra dữ liệu đầu vào có hợp lệ không
  if (!quizData || !quizData.length) {
    return <div>No questions available.</div>;
  }

  // Hàm xác định lớp cho câu hỏi
  const getClassQuestion = (index, quizData) => {
    if (quizData.answers && quizData.answers.length > 0) {
      let isUnAnswered = answers.some((a) => a.isSelected === false); // Kiểm tra xem có câu nào chưa được chọn không
      if (!isUnAnswered) {
        return "question-number selected"; // Nếu tất cả các câu hỏi đều đã được trả lời
      }
    }
    return "question-number"; // Lớp mặc định khi chưa có câu trả lời
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
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

// Định nghĩa kiểu dữ liệu cho props
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
          isSelected: PropTypes.bool.isRequired, // Đảm bảo có thuộc tính 'isSelected'
        })
      ).isRequired,
    })
  ).isRequired,
};

export default RightTestContent;
