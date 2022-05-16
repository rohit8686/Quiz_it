import React from "react";
import { Link, useParams } from "react-router-dom";
import "./rules.css";

export const Rules = () => {
  const { quizName } = useParams();

  return (
    <div>
      <h1 className="text-center pt-1">Rules</h1>
      <div className="card rules-card">
        <ol type="1">
          <li className="rule">
            There are a total of 5 questions in each category.
          </li>
          <li className="rule">Each question carries 5 points.</li>
          <li className="rule">
            For every wrong answer, there will be a deduction of 2 points.
          </li>
          <li className="rule">
            There is a time limit of 45 seconds to answer each question.
          </li>
          <li className="rule">
            You cannot attempt other quiz before submitting the last quiz.
          </li>
          <li className="rule">
            Your progress will be lost if you quit in between the quiz.
          </li>
        </ol>
        {quizName && (
          <Link to={`/quiz/${quizName}`} className="link">
            <button className="btn btn-error btn-size">Attempt Quiz</button>
          </Link>
        )}
      </div>
    </div>
  );
};
