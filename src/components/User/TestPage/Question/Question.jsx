import PropTypes from "prop-types";

const Question = (props) => {
  const { data, index } = props;

  const handelRadioButton = (event, aID, qID) => {
    props.handelRadioButton(aID, qID);
  };

  // Đảm bảo dữ liệu hợp lệ được truyền vào
  if (!data || !data.question) {
    return <div>No data available.</div>;
  }

  return (
    <>
      {data?.question?.ImagePath && (
        <div className="q-image">
          <img src={data.question.ImagePath} alt="Question" />
        </div>
      )}

      <div className="question mt-5">
        Question {index + 1}: {data.question.Text}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, idx) => (
            <div key={`answer-${idx}`} className="a-child">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${data.question.Id}`}
                  checked={answer.isSelected}
                  value=""
                  onChange={(event) =>
                    handelRadioButton(event, answer.Id, data.question.Id)
                  }
                />
                <label className="form-check-label">{answer.Text}</label>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

// Xác thực các kiểu prop
Question.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.shape({
      AnswerCounts: PropTypes.number.isRequired,
      ImageName: PropTypes.string,
      ImagePath: PropTypes.string,
      CreatedAt: PropTypes.string.isRequired,
      Id: PropTypes.number.isRequired,
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
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handelRadioButton: PropTypes.func.isRequired,
  handelNext: PropTypes.func.isRequired,
};

export default Question;
