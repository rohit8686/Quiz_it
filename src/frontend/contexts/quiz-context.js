import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../firebase.config";

const QuizContext = createContext();
const useQuiz = () => useContext(QuizContext);

const QuizProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "questions", "MpqCwTsMNEKW8YKF6E6C");
      const questions = await getDoc(docRef);
      if (questions.exists()) {
        quizDispatch({ type: "QUIZ_DATA", payload: questions.data() });
      }
    })();
  }, []);

  const initialState = {
    quizData: {},
    quizCategory: "",
    selectedOption: "",
    selectedOptions: [],
    score: 0,
    questions: [],
    questionNumber: 0,
  };
  const quizReducerFunction = (quizState, action) => {
    switch (action.type) {
      case "QUIZ_DATA":
        return { ...quizState, quizData: action.payload };
      case "QUIZ_CATEGORY":
        return { ...quizState, quizCategory: action.payload };
      case "QUESTIONS":
        return { ...quizState, questions: action.payload };
      case "NEXT_QUESTION":
        const { questionNumber, questions } = quizState;
        if (questionNumber === questions.length - 1) {
          return { ...quizState, questionNumber: 0 };
        } else {
          return { ...quizState, questionNumber: questionNumber + 1 };
        }
      case "RESET_QUESTION":
        return { ...quizState, questionNumber: 0 };
      case "SELECTED_OPTIONS":
        return {
          ...quizState,
          selectedOptions: [...quizState.selectedOptions, action.payload],
        };
      case "CLEAR_SELECTED_OPTIONS":
        return { ...quizState, selectedOptions: [] };
      case "SELECTED_OPTION":
        return {
          ...quizState,
          selectedOption: action.payload,
        };
      case "CORRECT_ANSWER":
        return {
          ...quizState,
          score: quizState.score + 5,
        };
      case "WRONG_ANSWER":
        return {
          ...quizState,
          score: quizState.score - 2,
        };
      case "SCORE":
        return { ...quizState, score: action.payload };
      case "RESET_SCORE":
        return {
          ...quizState,
          score: 0,
        };
      default:
        return { ...quizState };
    }
  };

  const [quizState, quizDispatch] = useReducer(
    quizReducerFunction,
    initialState
  );

  const value = {
    quizState,
    quizDispatch,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export { QuizProvider, useQuiz };
