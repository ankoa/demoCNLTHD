import React from "react"; // Nếu bạn chưa import React
import PropTypes from "prop-types"; // Import PropTypes để sử dụng

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { propTypes } from "react-bootstrap/esm/Image";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  console.log(">>>> dataModalResult: ", dataModalResult);
  // Hàm đóng modal
  const handelClose = () => setShow(false);

  return (
    <Modal
      show={show} // Sử dụng giá trị show từ props
      onHide={handelClose} // Sử dụng handelClose đã khai báo
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
          variant="secondary"
          onClick={handelClose} // Đảm bảo rằng bạn sử dụng handelClose đúng
          style={{ marginRight: "1rem", padding: "0.5rem 1.5rem" }}
        >
          Show Answer
        </Button>
        <Button
          variant="danger"
          onClick={handelClose} // Đảm bảo rằng bạn sử dụng handelClose đúng
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
