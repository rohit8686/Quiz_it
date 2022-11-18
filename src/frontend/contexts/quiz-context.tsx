import { doc, DocumentData, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../firebase.config";
import { ReactNode } from "react";
import { QuizQuestion } from "../quiz.types";
import quizReducerFunction from "./reducerFn/quizReducerFn";

type Props = {
  children: ReactNode;
};

export type Quiz = {
  isLoading: boolean;
  quizData: DocumentData;
  quizCategory: string;
  selectedOption: string;
  selectedOptions: string[];
  score: number;
  questions: QuizQuestion[];
  questionNumber: number;
};

export type Action =
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
  | { type: "RESET_SCORE" }
  | { type: "DEFAULT" };

export const initialState: Quiz = {
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
