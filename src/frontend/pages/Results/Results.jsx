import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { useQuiz } from "../../contexts/quiz-context";
import { db } from "../../firebase.config";
import "./results.css";

export const Results = () => {
  const {
    quizState: { quizCategory, selectedOptions, score, questions },
    quizDispatch,
  } = useQuiz();
  const { currentUser } = useAuth();
  const userId = currentUser?.providerData[0].uid;

  useEffect(() => {
    return () => {
      quizDispatch({ type: "CLEAR_SELECTED_OPTIONS" });
      quizDispatch({ type: "SELECTED_OPTION", payload: "" });
      quizDispatch({ type: "RESET_SCORE" });
    };
  }, [quizDispatch]);

  useEffect(() => {
    questions.forEach(({ answer, _id }) => {
      if (selectedOptions.length !== 0 && selectedOptions[_id - 1]) {
        if (answer === selectedOptions[_id - 1]) {
          quizDispatch({ type: "CORRECT_ANSWER" });
        } else {
          quizDispatch({ type: "WRONG_ANSWER" });
        }
      }
    });
  }, [questions, quizDispatch, selectedOptions]);

  useEffect(() => {
    if (quizCategory) {
      setDoc(doc(db, userId, quizCategory), {
        selectedOptions,
        score,
      });
    }
  }, [score, userId, quizCategory, selectedOptions]);

  const optionHandler = (index, answer, option) => {
    if (selectedOptions[index]) {
      if (
        selectedOptions[index] === option &&
        selectedOptions[index] === answer
      ) {
        return "correct-option";
      } else if (selectedOptions[index] === option) {
        return "wrong-option";
      } else if (option === answer) {
        return "correct-option";
      }
    } else if (option === answer) {
      return "correct-option";
    } else {
      return;
    }
  };

  return (
    <div>
      <h2 className="text-center pt-1">Your score is {score}</h2>
      <div>
        {questions.map(
          (
            { question, option1, option2, option3, option4, answer, _id },
            index
          ) => {
            return (
              <div className="container pt-1 mb-0" key={_id}>
                <div className="flex space-between">
                  <h3>
                    Question {_id}/{questions.length}
                  </h3>
                  <p className="bg">
                    {selectedOptions.length === 0 || !selectedOptions[index]
                      ? "Not attempted"
                      : "Attempted"}
                  </p>
                </div>
                <h2 className="pt-1 pb-1">{question}</h2>
                <div className="option mb-1">
                  <input
                    type="radio"
                    name={question}
                    className={`input-radio`}
                    id={option1}
                    disabled={true}
                  />
                  <label
                    className={`label ${optionHandler(index, answer, option1)}`}
                    htmlFor={option1}
                  >
                    {option1}
                  </label>
                </div>
                <div className="option mb-1">
                  <input
                    type="radio"
                    name={question}
                    className={`input-radio`}
                    id={option2}
                    disabled={true}
                  />
                  <label
                    className={`label ${optionHandler(index, answer, option2)}`}
                    htmlFor={option2}
                  >
                    {option2}
                  </label>
                </div>
                <div className="option mb-1">
                  <input
                    type="radio"
                    name={question}
                    className={`input-radio `}
                    id={option3}
                    disabled={true}
                  />
                  <label
                    className={`label ${optionHandler(index, answer, option3)}`}
                    htmlFor={option3}
                  >
                    {option3}
                  </label>
                </div>
                <div className="option mb-1">
                  <input
                    type="radio"
                    name={question}
                    className={`input-radio`}
                    id="option4"
                    disabled={true}
                  />
                  <label
                    className={`label ${optionHandler(index, answer, option4)}`}
                    htmlFor="option4"
                  >
                    {option4}
                  </label>
                </div>
              </div>
            );
          }
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
