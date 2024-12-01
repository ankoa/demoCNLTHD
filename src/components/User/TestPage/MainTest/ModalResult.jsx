import React from "react"; // Import React
import PropTypes from "prop-types"; // Import PropTypes for type checking
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  const navigate = useNavigate();

  // Hàm đóng modal
  const handelClose = () => setShow(false);

  // Hàm điều hướng đến trang kết quả chi tiết
  const handleNavigate = (historyID) => {
    navigate(`/testResults/${historyID}`);
  };

  return (
    <Modal
      show={show} // Sử dụng giá trị show từ props
      onHide={handelClose} // Hàm đóng modal
      size="xl"
      className="modal-add-user"
    >
      <Modal.Header closeButton style={{ borderBottom: "2px solid #dee2e6" }}>
        <Modal.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Result Test
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2rem", textAlign: "center" }}>
        <div>Total question: {dataModalResult.TotalQuestions}</div>
        <div>Total correct answer: {dataModalResult.CorrectAnswers}</div>
        <div>Score: {dataModalResult.Score}</div>
      </Modal.Body>
      <Modal.Footer
        style={{
          borderTop: "2px solid #dee2e6",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <Button
          variant="danger" // Nút mang tính tiêu cực
          onClick={() => handleNavigate(dataModalResult.HistoryId)} // Sử dụng ID từ dataModalResult
          style={{ marginRight: "1rem", padding: "0.5rem 1.5rem" }}
        >
          Show Answer
        </Button>

        <Button
          variant="danger"
          onClick={handelClose} // Đóng modal
          style={{ padding: "0.5rem 1.5rem" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Định nghĩa kiểu dữ liệu cho props
ModalResult.propTypes = {
  dataModalResult: PropTypes.shape({
    HistoryId: PropTypes.number.isRequired,
    TotalQuestions: PropTypes.number.isRequired,
    CorrectAnswers: PropTypes.number.isRequired,
    Score: PropTypes.number.isRequired,
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
  }).isRequired,
};

export default ModalResult;
