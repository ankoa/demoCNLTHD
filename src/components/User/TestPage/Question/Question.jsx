import "./Question.scss";
import _ from "lodash";
import PropTypes from "prop-types";

const Question = (props) => {
  const { data, index } = props;

  // Kiểm tra dữ liệu có hợp lệ không
  if (_.isEmpty(data)) {
    return <div>No data available.</div>; // Trả về thông báo nếu không có dữ liệu
  }

  const handelRadioButton = (event, aID, qID) => {
    console.log(">>>> data props: ", aID, qID);
    props.handelRadioButton(aID, qID); // Cập nhật sự kiện cho radio button
  };

  return (
    <>
      {data.question.ImagePath ? (
        <div className="q-image">
          <img src={data.question.ImagePath} alt="Question" />
        </div>
      ) : (
        <div className="q-image"></div>
      )}

      <div className="question">
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
                  type="radio" // Sử dụng radio button
                  name={`question-${data.question.Id}`} // Đảm bảo tất cả radio buttons có name giống nhau
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

// Xác thực kiểu cho props
Question.propTypes = {
  data: PropTypes.shape({
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
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handelRadioButton: PropTypes.func.isRequired, // Thêm xác thực cho handelCheckBox
};

export default Question;
