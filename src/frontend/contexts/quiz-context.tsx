import { doc, DocumentData, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../firebase.config";
import { ReactNode } from "react";
import { QuizQuestion } from "../quiz.types";

type Props = {
  children: ReactNode;
};

type Quiz = {
  isLoading: boolean;
  quizData: DocumentData;
  quizCategory: string;
  selectedOption: string;
  selectedOptions: string[];
  score: number;
  questions: QuizQuestion[];
  questionNumber: number;
};

type Action =
  | { type: "LOADING"; payload: boolean }
  | { type: "QUIZ_DATA"; payload: DocumentData }
  | { type: "QUIZ_CATEGORY"; payload: string }
  | { type: "QUESTIONS"; payload: QuizQuestion[] }
  | { type: "NEXT_QUESTION" }
  | { type: "RESET_QUESTION" }
  | { type: "SELECTED_OPTIONS"; payload: string }
  | { type: "CLEAR_SELECTED_OPTIONS" }
  | { type: "SELECTED_OPTION"; payload: string }
  | { type: "CORRECT_ANSWER" }
  | { type: "WRONG_ANSWER" }
  | { type: "SCORE"; payload: number }
  | { type: "RESET_SCORE" };

const initialState: Quiz = {
  isLoading: true,
  quizData: {
    React: [],
    CSS: [],
    HTML: [],
    JS: [],
  },
  quizCategory: "",
  selectedOption: "",
  selectedOptions: [],
  score: 0,
  questions: [],
  questionNumber: 0,
};

const QuizContext = createContext<{
  quizState: typeof initialState;
  quizDispatch: (action: Action) => void;
}>({ quizState: initialState, quizDispatch: () => {} });
const useQuiz = () => useContext(QuizContext);

const QuizProvider = ({ children }: Props) => {
  const quizReducerFunction = (quizState: Quiz, action: Action): Quiz => {
    switch (action.type) {
      case "LOADING":
        return { ...quizState, isLoading: action.payload };
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

  // const QuizContext = createContext<{
  //   quizState: typeof initialState;
  //   quizDispatch: (action: Action) => void;
  // }>({ quizState: initialState, quizDispatch: () => {} });
  // const useQuiz = () => useContext(QuizContext);

  const [quizState, quizDispatch] = useReducer(
    quizReducerFunction,
    initialState
  );

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "questions", "MpqCwTsMNEKW8YKF6E6C");
      const questions = await getDoc(docRef);

      if (questions.exists()) {
        quizDispatch({ type: "QUIZ_DATA", payload: questions.data() });
      }
      quizDispatch({ type: "LOADING", payload: false });
    })();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizState,
        quizDispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizProvider, useQuiz };
