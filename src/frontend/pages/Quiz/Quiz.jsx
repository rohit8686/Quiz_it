import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../../contexts/quiz-context";
import "./quiz.css";

export const Quiz = () => {
  const [timer, setTimer] = useState(45);
  const navigate = useNavigate();
  const { quizName } = useParams();
  const {
    quizState: { quizData, selectedOption, questionNumber, questions },
    quizDispatch,
  } = useQuiz();

  const { question, option1, option2, option3, option4 } =
    questions[questionNumber] || {};

  useEffect(() => {
    for (let category in quizData) {
      if (category === quizName) {
        quizDispatch({ type: "QUESTIONS", payload: quizData[category] });
      }
    }
    quizDispatch({ type: "QUIZ_CATEGORY", payload: quizName });
  }, [quizName, quizDispatch, quizData]);

  useEffect(() => {
    quizDispatch({ type: "CLEAR_SELECTED_OPTIONS" });
    quizDispatch({ type: "SELECTED_OPTION", payload: "" });
    quizDispatch({ type: "RESET_SCORE" });
    quizDispatch({ type: "RESET_QUESTION" });

    const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [quizDispatch]);

  useEffect(() => {
    if (timer === 0 && questionNumber === questions.length - 1) {
      quizDispatch({ type: "SELECTED_OPTIONS", payload: selectedOption });
      navigate("/results", { replace: true });
    } else if (timer === 0) {
      quizDispatch({ type: "SELECTED_OPTIONS", payload: selectedOption });
      quizDispatch({ type: "NEXT_QUESTION" });
      setTimer(45);
    }
  }, [
    timer,
    questionNumber,
    questions.length,
    quizDispatch,
    selectedOption,
    navigate,
  ]);

  const nextQuestion = () => {
    if (questionNumber === questions.length - 1) {
      submitQuiz();
    } else {
      quizDispatch({ type: "SELECTED_OPTIONS", payload: selectedOption });
      quizDispatch({ type: "NEXT_QUESTION" });
      quizDispatch({ type: "SELECTED_OPTION", payload: "" });
      setTimer(45);
    }
  };

  const submitQuiz = () => {
    quizDispatch({ type: "SELECTED_OPTIONS", payload: selectedOption });
    quizDispatch({ type: "NEXT_QUESTION" });
    navigate("/results", { replace: true });
  };

  return (
    <div>
      <h2 className="text-center pt-1">{quizName} Quiz</h2>
      <form onSubmit={submitQuiz}>
        <div className="container pt-1">
          <div className="flex space-between">
            <h3>
              Question {questionNumber + 1}/{questions.length}
            </h3>
            <h3 className="bg">Time : {timer}</h3>
          </div>
          <h2 className="pt-1 pb-1">{question}</h2>
          <div className="option mb-1">
            <input
              type="radio"
              name={question}
              className="input-radio"
              id={option1}
              onChange={() =>
                quizDispatch({
                  type: "SELECTED_OPTION",
                  payload: option1,
                })
              }
              checked={selectedOption === option1}
            />
            <label className="label" htmlFor={option1}>
              {option1}
            </label>
          </div>
          <div className="option mb-1">
            <input
              type="radio"
              name={question}
              className="input-radio"
              id={option2}
              onChange={() =>
                quizDispatch({
                  type: "SELECTED_OPTION",
                  payload: option2,
                })
              }
              checked={selectedOption === option2}
            />
            <label className="label" htmlFor={option2}>
              {option2}
            </label>
          </div>
          <div className="option mb-1">
            <input
              type="radio"
              name={question}
              className="input-radio"
              id={option3}
              onChange={() =>
                quizDispatch({
                  type: "SELECTED_OPTION",
                  payload: option3,
                })
              }
              checked={selectedOption === option3}
            />
            <label className="label" htmlFor={option3}>
              {option3}
            </label>
          </div>
          <div className="option mb-1">
            <input
              type="radio"
              name={question}
              className="input-radio"
              id="option4"
              onChange={() =>
                quizDispatch({
                  type: "SELECTED_OPTION",
                  payload: option4,
                })
              }
              checked={selectedOption === option4}
            />
            <label className="label" htmlFor="option4">
              {option4}
            </label>
          </div>
          <div className="flex space-between">
            <button className="btn btn-error" onClick={() => navigate("/")}>
              Quit Quiz
            </button>
            <div className="flex no-gap next-question" onClick={nextQuestion}>
              <h3>
                {questionNumber === questions.length - 1 ? "Submit" : "Next"}
              </h3>
              <span className="material-icons"> chevron_right </span>
            </div>
          </div>
        </div>
        <button className="btn btn-error submit-btn">Submit Quiz</button>
      </form>
    </div>
  );
};
