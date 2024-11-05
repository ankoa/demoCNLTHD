// import React from 'react';
import "./Question.scss";
const Question = (props) => {
  return (
    <>
      <div className="question">Question 0: How are you today ? </div>
      <div className="answer">
        <div className="a-child">A. answer a</div>
        <div className="a-child">B. answer b</div>
        <div className="a-child">C. answer c</div>
        <div className="a-child">D. answer d</div>
      </div>
    </>
  );
};

export default Question;
