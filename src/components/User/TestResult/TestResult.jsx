import React, { useEffect, useState, useRef, useId } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useHistory

import { GiCheckMark, GiBullseye } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { FaTimesCircle, FaMinusCircle, FaCheckCircle, FaTimes, FaCheck } from "react-icons/fa";

import "./TestResult.scss";
import { getHistoryById, getPartOfHis } from "../../../services/historyService";
import { getTestByID } from "../../../services/testService";
import { getQuestionByPartID } from "../../../services/partService";
import { getUserAnswerByHisID } from "../../../services/userAnswerService";

const TestResult = () => {
  const { historyID } = useParams(); // Lấy historyID từ URL
  const userID = "1"; //thêm userID khi cấu hình xong login
  const [historyData, setHistoryData] = useState([]);
  const [partData, setPartData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [skip, setSkip] = useState(null);



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showQuestion, setShowQuestion] = useState(false);// State để điều khiển hiển thị câu hỏi
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const overlayRef = useRef();
  const navigate = useNavigate(); // Hook để điều hướng
  const partRefs = useRef({});// Tạo ref cho mỗi part section

  // Khai báo state cho các giá trị cần tính toán
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [formattedTime, setFormattedTime] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Lấy historyData
        const historyResponse = await getHistoryById(historyID);
        if (historyResponse.EC !== 0) {
          setError(historyResponse.EM);
          return;
        }
        setHistoryData(historyResponse.DT);

        const partResponse = await getPartOfHis(userID, historyID);
        if (partResponse.EC !== 0) {
          setError(partResponse.EM);
          return;
        }
        setPartData(partResponse.DT);


        // Lấy testData sau khi có historyData
        const testResponse = await getTestByID(historyResponse.DT.TestID);
        if (testResponse.EC !== 0) {
          setError(testResponse.EM);
          return;
        }
        setTestData(testResponse.DT);

        // Lấy userAnswers
        const userAnswersResponse = await getUserAnswerByHisID(historyID);
        if (userAnswersResponse.EC !== 0) {
          setError(userAnswersResponse.EM);
          return;
        }
        setUserAnswers(userAnswersResponse.DT);

      } catch (error) {
        setError("Lỗi khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [historyID]);


  useEffect(() => {
    const fetchQuestionsWithAnswers = async () => {
      if (partData.length > 0 && userAnswers.length > 0) {
        setLoading(true);
        setError(null);

        try {
          // Fetch initial part data (assume it's already set in partData)
          const partsWithQuestionsPromises = partData.map(async (part) => {
            const response = await getQuestionByPartID(part.PartId);
            if (response.EC === 0) {
              const { questions } = response.DT.part;
              // Add `userAnswer` field to each question based on `userAnswers`
              const questionsWithAnswers = questions.map((q) => {
                const userAnswer = userAnswers.find(
                  (ua) => ua.QuestionID == q.question.Id
                );

                return {
                  ...q,
                  userAnswer: userAnswer || null, // If no answer, set as null
                };
              });

              return {
                ...part,
                questions: questionsWithAnswers,
              };
            } else {
              setError(response.EM);
              return null;
            }
          });

          // Execute all part question fetch promises
          const partsWithQuestions = await Promise.all(partsWithQuestionsPromises);
          setFullData(partsWithQuestions);

        } catch (error) {
          console.error("Error while fetching questions:", error);
          setError("Error fetching questions data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestionsWithAnswers();
  }, [partData, userAnswers]);

  useEffect(() => {
    let skipCount = 0;
    let questions = 0;
    let correct = 0;
    if (partData) {
      partData.map((part) => {
        questions += + part.Total_Question;
        correct += part.Total_Correct;
      })
    }

    fullData.forEach(part => {
      part.questions.forEach(item => {
        if (item.userAnswer == null) {
          skipCount += 1;
        }
      });
    });

    setTotalQuestions(questions);
    setCorrectAnswers(correct);
    setIncorrectAnswers(questions - correct - skipCount);
    setSkip(skipCount);

    let accuracyValue = ((correct / totalQuestions) * 100).toFixed(1);
    setAccuracy(accuracyValue);


    let timeDiff = new Date(new Date(historyData.EndTime || new Date()) - new Date(historyData.StartTime || new Date()));
    let formatted = `${String(timeDiff.getUTCHours()).padStart(2, '0')}:${String(timeDiff.getUTCMinutes()).padStart(2, '0')}:${String(timeDiff.getUTCSeconds()).padStart(2, '0')}`;
    setFormattedTime(formatted);

  }, [partData, historyData, fullData]);

  const convertSelectedToLetter = (selectedId) => {
    const letters = ['A', 'B', 'C', 'D']; // Tương ứng với 1, 2, 3, 4
    return letters[(selectedId - 1) % 4]; // Giả sử SelectedID là từ 1 đến 4
  };


  // Xử lý khi người dùng chọn câu trả lời
  const handleAnswerSelect = (answer) => {
    setData({ ...data, userAnswer: answer });
  };

  const handleShowDetails = (question) => {
    setSelectedQuestion(question);
    setShowQuestion(true);
  };

  const handleCloseOverlay = () => {
    setShowQuestion(false);
    setSelectedQuestion(null);
  };

  // Hàm xử lý cuộn đến phần cụ thể
  const handleScrollToPart = (partName) => {
    // Kiểm tra nếu ref của phần tử đó tồn tại
    if (partRefs.current[partName]) {
      partRefs.current[partName].scrollIntoView({
        behavior: "smooth", // Cuộn mượt mà
        block: "start",     // Cuộn đến phần đầu của phần tử
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

    <div className="result-display">
      <div className="result-display__header">
        <h2>Kết quả luyện tập: {testData.Name}</h2>
        <div className="part-buttons">
          {partData &&
            partData.map((part) => (
              <button
                key={part.PartName}
                className="partButton"
                onClick={() => handleScrollToPart(part.PartName)}
              >
                {part.PartName}
              </button>
            ))}
        </div>
      </div>
      <button className="result-display__back">Quay về trang đề thi</button> {/* Điều hướng */}
      <div className="result-display__content">
        <div className="result-display__summary">
          <div className="result-display__summary__element">
            <span><GiCheckMark color="green" /> Kết quả làm bài </span>
            <strong>{correctAnswers}/{totalQuestions}</strong>
          </div>
          <div className="result-display__summary__element">
            <span><GiBullseye /> Độ chính xác</span>
            <strong>{accuracy}%</strong>
          </div>
          <div className="result-display__summary__element">
            <span><MdOutlineTimer color="red" /> Thời gian hoàn thành</span>
            <strong>{formattedTime}</strong>
          </div>
        </div>

        <div className="result-display__stats">
          <div className="result-display__stat correct">
            <FaCheckCircle className="icon" />
            <span>Trả lời đúng</span>
            <strong>{correctAnswers}</strong>
            <span>câu hỏi</span>
          </div>
          <div className="result-display__stat incorrect">
            <FaTimesCircle className="icon" />
            <span>Trả lời sai</span>
            <strong>{incorrectAnswers}</strong>
            <span>câu hỏi</span>
          </div>
          <div className="result-display__stat skipped">
            <FaMinusCircle className="icon" />
            <span>Bỏ qua</span>
            <strong>{skip}</strong>
            <span>câu hỏi</span>
          </div>
        </div>
      </div>

      <div className="answer-list">
        <h3>Đáp án</h3>
        {fullData.map((part, index) => {
          return (
            <div
              key={index}
              className="part-section"
              ref={(el) => (partRefs.current[part.PartName] = el)} // Gán ref cho từng phần part
            >
              <div className="part-title">{part.PartName}</div>
              <div className="answer-grid">
                {part.questions.map((item, indexQues) => {
                  // console.log(item)
                  return (
                    <div key={indexQues} className="answer-item">
                      <div className="question-number">{indexQues + 1}</div>
                      <div class="answer-wrapper">
                        {item.userAnswer == null ? (
                          <span>Chưa chọn</span> // Hiển thị nếu không có userAnswer
                        ) : (
                          <div className="answer-choice">
                            <span>{convertSelectedToLetter(item.userAnswer.SelectedAnswerID)}</span>
                            <div className={`selected-answer ${item.userAnswer.IsCorrect === true ? "correct" : "incorrect"}`}></div>
                            {item.userAnswer.IsCorrect === true ? (
                              <span className="correct-icon" >  <FaCheck />  </span>
                            ) : (
                              <span className="incorrect-icon"><FaTimes /></span>
                            )}
                          </div>
                        )}
                      </div>

                      <span
                        className="details-toggle"
                        onClick={() => handleShowDetails(item)}
                      >
                        [Chi tiết]
                      </span>
                      {showQuestion && selectedQuestion && (
                        <div className="overlay" ref={overlayRef}>
                          <div className="overlay-content">
                            <button className="close-button" onClick={handleCloseOverlay}><FaTimes/></button>
                            <h3>{selectedQuestion.question.Text}</h3>
                            <ul>
                              {selectedQuestion.answers.map((answer) => {
                                 return (
                                <li
                                  key={answer.Id}
                                  className={`answer-list-item ${
                                    answer.IsCorrect == true
                                      ? 'correct-answer-bg'
                                      : selectedQuestion.userAnswer != null && 
                                      (selectedQuestion.userAnswer.SelectedAnswerID === answer.Id) &&
                                      selectedQuestion.userAnswer.IsCorrect == false
                                      ? 'incorrect-answer-bg'
                                      : ''
                                  }`}
                                >
                                  <span style={{ fontWeight: "bold"}}>{convertSelectedToLetter(answer.Id)}</span>
                                  . {answer.Text}
                                </li>
                              )})}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default TestResult;
