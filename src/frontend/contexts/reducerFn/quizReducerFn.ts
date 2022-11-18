import { Quiz } from "../quiz-context";
import { Action } from "../quiz-context";

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
export default quizReducerFunction;
