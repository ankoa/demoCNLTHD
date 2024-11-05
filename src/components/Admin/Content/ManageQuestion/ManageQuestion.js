import React, { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './Question'; // Import the memoized Question component
import "./ManageQuestion.scss";
import { FaPlus } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import Select from 'react-select';
import { getAllQuiz, getDataQuiz } from "../../../../service/quizService";
import _ from "lodash";

const ManageQuestion = () => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRefs = useRef([]);

    const fetchQuestions = async (quizId) => {
        if (!quizId) return;

        let response = await getDataQuiz(quizId);
        if (response && response.EC === 0) {
            let raw = response.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();

            setDataQuiz(data);
        }
        console.log(dataQuiz)
    };
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                let response = await getAllQuiz();
                if (response && response.EC === 0) {
                    let quizOptions = response.DT.map((item) => ({
                        value: item.id,
                        label: `${item.id} - ${item.description}`
                    }));
                    setOptions(quizOptions);
                }
            } catch (error) {
                console.error("Failed to fetch quiz data", error);
                toast.error("Failed to fetch quizzes.");
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (selectedQuiz) {
            fetchQuestions(selectedQuiz);
        }
    }, [selectedQuiz]);

    const handleQuestionTextChange = useCallback((index, value) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].description = value;
            return newQuestions;
        });
    }, []);

    const handleImageUpload = useCallback((index, file) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].image = file ? URL.createObjectURL(file) : null;
            return newQuestions;
        });
    }, []);

    const handleRemoveImage = useCallback((qIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[qIndex].image = null;
            return newQuestions;
        });

        if (fileInputRefs.current[qIndex]) {
            fileInputRefs.current[qIndex].value = null;
        }
    }, []);

    const handleAnswerTextChange = useCallback((qIndex, aIndex, value) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[qIndex].answers[aIndex].description = value;
            return newQuestions;
        });
    }, []);

    const handleCorrectAnswerChange = useCallback((qIndex, aIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((answer, i) => ({
                ...answer,
                correct: i === aIndex,
            }));
            return newQuestions;
        });
    }, []);

    const handleAddAnswer = useCallback((qIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            if (newQuestions[qIndex].answers.length >= 4) return newQuestions;
            newQuestions[qIndex].answers.push({ id: uuidv4(), description: "", correct: false });
            return newQuestions;
        });
    }, []);

    const handleRemoveAnswer = useCallback((qIndex, aIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[qIndex].answers.splice(aIndex, 1);
            return newQuestions;
        });
    }, []);

    const handleAddQuestion = () => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
            { description: "", image: null, answers: [{ id: uuidv4(), description: "", correct: false }] },
        ]);
    };

    const handleRemoveQuestion = (qIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions.splice(qIndex, 1);
            return newQuestions;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (questions.some((q) => !q.description)) {
            toast.error("Please fill out all questions.");
            return;
        }

        for (const question of questions) {
            if (question.answers.length < 2) {
                toast.error("Each question must have at least two answers.");
                return;
            }
            if (!question.answers.some((answer) => answer.correct)) {
                toast.error("Each question must have one correct answer.");
                return;
            }
        }

        console.log(questions);
        toast.success("Questions submitted successfully!");
    };

    return (
        <div className="container">
            <h3>Manage Questions</h3>
            <div className='other row g-3 mb-3' style={{ width: '50%' }}>
                <div className="col-md-7">
                    <label htmlFor="selectQuiz">Select quiz</label>
                    <Select
                        onChange={(selectedOption) => setSelectedQuiz(selectedOption.value)}
                        options={options}
                        value={options.find(option => option.value === selectedQuiz)}
                        id="selectQuiz"
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    questions.map((question, qIndex) => (
                        <Question
                            key={qIndex}
                            qIndex={qIndex}
                            question={question}
                            handleQuestionTextChange={handleQuestionTextChange}
                            handleImageUpload={handleImageUpload}
                            handleRemoveImage={handleRemoveImage}
                            handleAnswerTextChange={handleAnswerTextChange}
                            handleCorrectAnswerChange={handleCorrectAnswerChange}
                            handleAddAnswer={handleAddAnswer}
                            handleRemoveAnswer={handleRemoveAnswer}
                            handleRemoveQuestion={handleRemoveQuestion}
                            fileInputRef={(el) => (fileInputRefs.current[qIndex] = el)}
                        />
                    ))
                )}
                <div className="mb-5">
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{ marginRight: "2rem" }}
                        onClick={handleAddQuestion}
                    >
                        <FaPlus fontSize={20} /> Add Question
                    </button>

                    <button type="submit" className="btn btn-primary">
                        <TiTick fontSize={25} /> Submit Questions
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageQuestion;
