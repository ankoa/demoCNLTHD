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
import _ from "lodash";

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
            const answersWithSelection = answerResponse.DT.answers.map(
              (answer) => ({
                ...answer,
                isSelected: false, // Thêm isSelected cho mỗi câu trả lời
              })
            );

            quizDataArray.push({
              question,
              answers: answersWithSelection,
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
    console.log("=>>>>>>>QuizData: ", quizData);  
  };

  /*   console.log("List Quiz: ", quizData);
   */
  const handelPrevious = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handelNext = () => {
    if (quizData && quizData.length > index + 1) setIndex(index + 1);
  };
  const handelFinishQuiz = () => {
    console.log("check data before submid: ", quizData);
    if (quizData && quizData.length > 0) {
      console.log();
    }
  };
  /* const handelCheckBox = (answerID, questionID) => {
    console.log("=>>>>>>>>>>> Q and A: ", questionID, answerID);
    let dataQuizClone = _.cloneDeep(quizData);
    // Tìm câu hỏi tương ứng với questionID
    let questions = dataQuizClone.find(
      (item) => +item.question.Id === questionID // Truy cập đúng thuộc tính question.Id
    );

    // Kiểm tra nếu câu hỏi và mảng câu trả lời tồn tại
    if (questions && questions.answers) {
      // Cập nhật isSelected cho từng câu trả lời
      let b = (questions.answers = questions.answers.map((item) => {
        if (+item.Id === +answerID) {
          item.isSelected = !item.isSelected;
        }
        return item;
      }));
      questions.answers = b;
    } else {
      console.error(
        `Không tìm thấy câu hỏi hoặc câu trả lời cho questionID: ${questionID}`
      );
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.question.Id === +questionID
    );
    if (index > -1) {
      dataQuizClone[index] = questions;
      setQuizData(dataQuizClone);
    }
  }; */
  const handelRadioButton = (answerID, questionID) => {
    console.log("=>>>>>>>>>>> Q and A: ", questionID, answerID);
    let dataQuizClone = _.cloneDeep(quizData);

    // Tìm câu hỏi tương ứng với questionID
    let questions = dataQuizClone.find(
      (item) => +item.question.Id === questionID // Truy cập đúng thuộc tính question.Id
    );

    // Kiểm tra nếu câu hỏi và mảng câu trả lời tồn tại
    if (questions && questions.answers) {
      // Đặt lại isSelected cho tất cả câu trả lời của câu hỏi này
      questions.answers = questions.answers.map((item) => {
        if (+item.Id === +answerID) {
          item.isSelected = true; // Chỉ đánh dấu đáp án đã chọn là true
        } else {
          item.isSelected = false; // Đặt các đáp án khác thành false
        }
        return item;
      });
    } else {
      console.error(
        `Không tìm thấy câu hỏi hoặc câu trả lời cho questionID: ${questionID}`
      );
    }
    console.log("==>>>> Check click radio: ", questions);
    let index = dataQuizClone.findIndex(
      (item) => +item.question.Id === +questionID
    );
    if (index > -1) {
      dataQuizClone[index] = questions;
      setQuizData(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">{testData ? testData.Name : "Loading..."}</div>
        <div className="q-body">
          {/* <img
            src={testData ? testData.imageUrl : ""}
            alt={testData ? testData.Name : "Loading..."}
          /> */}
        </div>
        <div className="q-content">
          <Question
            index={index}
            handelRadioButton={handelRadioButton}
            data={quizData && quizData.length > 0 ? quizData[index] : []}
          />
        </div>
        <div className="footer">
          <button
            className="btn btn-secondary"
            onClick={() => handelPrevious()}
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={() => handelNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handelFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <div className="countdown">Count down: 00:00</div>
      </div>
    </div>
  );
};

export default MainTest;
