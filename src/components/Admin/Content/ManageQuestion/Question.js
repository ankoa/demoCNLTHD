import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaMinusCircle } from "react-icons/fa";
const Question = React.memo(({
    qIndex,
    question,
    handleQuestionTextChange,
    handleImageUpload,
    handleRemoveImage,
    handleAnswerTextChange,
    handleCorrectAnswerChange,
    handleAddAnswer,
    handleRemoveAnswer,
    handleRemoveQuestion,
    fileInputRef
}) => {

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label>Question {qIndex + 1}</label>
                {qIndex > 0 ? (
                    <FaTimes
                        className="remove-icon remove-question-icon"
                        onClick={() => handleRemoveQuestion(qIndex)}
                    />
                ) : null}


            </div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter your question"
                value={question.description}
                onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
            />

            <div className="mb-3" style={{ width: "20%" }}>
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
                />
                {question.image && (
                    <div className="position-relative mt-2">
                        <div className="question-img-preview img-thumbnail">
                            <img
                                src={question.image}
                                alt={`Question ${qIndex + 1}`}
                            />
                        </div>
                        <FaTimes
                            className="remove-icon remove-image-icon"
                            onClick={() => handleRemoveImage(qIndex)}
                        />
                    </div>
                )}
            </div>

            {question.answers.map((answer, aIndex) => (
                <div key={aIndex} className="row align-items-center mb-3">
                    <div className="col-auto">
                        <input
                            type="radio"
                            name={`correctAnswer${qIndex}`}
                            checked={answer.correct}
                            onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                        />
                    </div>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Answer ${aIndex + 1}`}
                            value={answer.description}
                            onChange={(e) => handleAnswerTextChange(qIndex, aIndex, e.target.value)}
                        />
                    </div>
                    {question.answers.length > 1 && (
                        <div className="col-md-1">
                            <FaMinusCircle
                                className="remove-icon remove-answer-icon"
                                onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                            />
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={() => handleAddAnswer(qIndex)}
            >
                Add Answer
            </button>
        </div>
    );
});

export default Question;
