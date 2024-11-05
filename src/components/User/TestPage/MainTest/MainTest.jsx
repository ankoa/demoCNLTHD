import { useEffect, useState } from "react";
import "./MainTest.scss";
import { useParams } from "react-router-dom";
import {
  getAllPartByTestID,
  getTestById,
  getAllQuestionsByPartID,
} from "../../../../services/testsService";
import { getAnswersOfQuestion } from "../../../../services/questionService";
import Question from "../Question/Question";

const MainTest = () => {
  const { testId } = useParams();
  const [partsData, setPartsData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState([]); // Đổi tên từ questions thành quizData
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchTestData();
    fetchAllPartsData();
  }, [testId]);

  const fetchTestData = async () => {
    try {
      const response = await getTestById(testId);
      if (response.EC === 0 && response.DT) {
        setTestData(response.DT);
      } else {
        setError("Không thể lấy dữ liệu bài kiểm tra do EC khác 0.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài kiểm tra:", error);
    }
  };

  const fetchAllPartsData = async () => {
    try {
      const response = await getAllPartByTestID(testId);
      if (response.EC === 0 && Array.isArray(response.DT.parts)) {
        const sortedParts = response.DT.parts.sort(
          (a, b) => a.Number - b.Number
        );
        setPartsData(sortedParts);
        await fetchQuizData(sortedParts);
      } else {
        setError("Không thể lấy dữ liệu phần do EC khác 0.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phần:", error);
    }
  };

  const fetchQuizData = async (parts) => {
    const quizDataArray = [];
    for (const part of parts) {
      const questionResponse = await getAllQuestionsByPartID(part.Id);
      if (
        questionResponse.EC === 0 &&
        Array.isArray(questionResponse.DT.questions)
      ) {
        for (const question of questionResponse.DT.questions) {
          const answerResponse = await getAnswersOfQuestion(question.Id);
          if (
            answerResponse.EC === 0 &&
            Array.isArray(answerResponse.DT.answers)
          ) {
            quizDataArray.push({
              question: answerResponse.DT.question,
              answers: answerResponse.DT.answers,
            });
          } else {
            console.error(
              `Không thể lấy câu trả lời cho câu hỏi ${question.Id}:`,
              answerResponse
            );
            quizDataArray.push({
              question,
              answers: null,
            });
          }
        }
      } else {
        console.error(
          `Không thể lấy câu hỏi cho phần ${part.Id}:`,
          questionResponse
        );
      }
    }
    setQuizData(quizDataArray); // Lưu dữ liệu vào quizData
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{testData ? testData.Name : "Loading..."}</div>
        <div className="q-body">
          <img
            src={testData ? testData.imageUrl : ""}
            alt={testData ? testData.Name : "Loading..."}
          />
        </div>
        <div className="q-content">
          {quizData.length > 0 ? (
            <Question question={quizData[index]} />
          ) : (
            <div>Loading questions...</div>
          )}
        </div>
        <div className="footer">
          <button
            className="btn btn-primary ml-3"
            onClick={() => setIndex(index + 1)}
            disabled={index >= quizData.length - 1}
          >
            Next
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIndex(index - 1)}
            disabled={index <= 0}
          >
            Previous
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default MainTest;
