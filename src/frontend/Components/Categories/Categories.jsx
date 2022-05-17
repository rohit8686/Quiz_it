import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../contexts/quiz-context";
import Loader from "react-js-loader";

export const Categories = () => {
  const {
    quizState: { quizData, isLoading },
  } = useQuiz();
  const categories = Object.keys(quizData);

  return (
    <div>
      <h1 className="text-center pt-1">Quiz Categories</h1>
      {isLoading ? (
        <Loader type="spinner-default" bgColor={"red"} size={100} />
      ) : (
        <div className="flex gap-2 category pt-1">
          {categories.map((category, index) => {
            return (
              <Link
                to={`/quiz/rules/${category}`}
                className="link pt-1"
                key={index}
              >
                <div
                  className={`quiz-category quiz-category-width flex ${category}`}
                >
                  <h2>{category}</h2>
                  <img
                    className="badge-img"
                    src={quizData[category][0].img}
                    alt={category}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
