import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1Ref = useRef(null);
  let option2Ref = useRef(null);
  let option3Ref = useRef(null);
  let option4Ref = useRef(null);

  let optionRefArray = [option1Ref, option2Ref, option3Ref, option4Ref];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((s) => s + 1);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        optionRefArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const handlNext = () => {
    if (index === data.length - 1) {
      setResult(true);
      return 0;
    }
    if (lock) {
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      optionRefArray.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("incorrect");
      });
    }
  };

  const handlReset = () => {
    setResult(false);
    setIndex(0);
    setLock(false);
    setQuestion(data[0]);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            Your Score Is {score} out of {data.length}
          </h2>
          <button onClick={handlReset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li ref={option1Ref} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2Ref} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3Ref} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4Ref} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={handlNext}>Next</button>
          <div className="index">
            {index + 1} out of of {data.length}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
