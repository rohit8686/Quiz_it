import { initialState, QuizProvider } from "./quiz-context";
import quizReducerFunction from "./reducerFn/quizReducerFn";
import { screen, render } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./auth-context";
import { getDoc } from "firebase/firestore";

const quizData = [
  {
    answer: "Cascading style sheets",
    option2: "Color style sheets",
    _id: 1,
    question: "CSS full form is ?",
    option4: "none of the above",
    option1: "Cascading style sheets",
    option3: "Color store sheet ",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
  },
];
const questions = [
  {
    option1: 'target = "_blank"',
    answer: 'target = "_blank"',
    question: "How to open link in new tab ?",
    option4: "none of the above",
    _id: 1,
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
    option2: 'target = "_self"',
    option3: 'target = "blank"',
  },
  {
    option1: 'target = "_blank"',
    answer: 'target = "_blank"',
    question: "How to open link in new tab ?",
    option4: "none of the above",
    _id: 2,
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
    option2: 'target = "_self"',
    option3: 'target = "blank"',
  },
];

describe("testing Quiz Reducer function", () => {
  it("loading", () => {
    const res = quizReducerFunction(initialState, {
      type: "LOADING",
      payload: false,
    });
    expect(res).toStrictEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it("quiz data", () => {
    const res = quizReducerFunction(initialState, {
      type: "QUIZ_DATA",
      payload: quizData,
    });
    expect(res).toStrictEqual({
      ...initialState,
      quizData: quizData,
    });
  });
  it("quiz category", () => {
    const res = quizReducerFunction(initialState, {
      type: "QUIZ_CATEGORY",
      payload: "REACT",
    });
    expect(res).toStrictEqual({
      ...initialState,
      quizCategory: "REACT",
    });
  });
  it("questions", () => {
    const res = quizReducerFunction(initialState, {
      type: "QUESTIONS",
      payload: questions,
    });
    expect(res).toStrictEqual({
      ...initialState,
      questions: questions,
    });
  });
  it("next question number", () => {
    const res = quizReducerFunction(initialState, {
      type: "NEXT_QUESTION",
    });
    expect(res).toStrictEqual({
      ...initialState,
      questionNumber: 1,
    });
  });
  it("next question number when at last question", () => {
    const initialState = {
      isLoading: true,
      quizData: {},
      quizCategory: "",
      selectedOption: "",
      selectedOptions: [],
      score: 0,
      questions: questions,
      questionNumber: 1,
    };
    const res = quizReducerFunction(initialState, {
      type: "NEXT_QUESTION",
    });
    expect(res).toStrictEqual({
      ...initialState,
      questionNumber: 0,
    });
  });
  it("reset question", () => {
    const res = quizReducerFunction(initialState, {
      type: "RESET_QUESTION",
    });
    expect(res).toStrictEqual({
      ...initialState,
      questionNumber: 0,
    });
  });
  it("selected options", () => {
    const res = quizReducerFunction(initialState, {
      type: "SELECTED_OPTIONS",
      payload: "Color style sheets",
    });
    expect(res).toStrictEqual({
      ...initialState,
      selectedOptions: ["Color style sheets"],
    });
  });
  it("clear selected options", () => {
    const res = quizReducerFunction(initialState, {
      type: "CLEAR_SELECTED_OPTIONS",
    });
    expect(res).toStrictEqual({
      ...initialState,
      selectedOptions: [],
    });
  });
  it("selected option", () => {
    const res = quizReducerFunction(initialState, {
      type: "SELECTED_OPTION",
      payload: "Color style sheets",
    });
    expect(res).toStrictEqual({
      ...initialState,
      selectedOption: "Color style sheets",
    });
  });
  it("correct answer", () => {
    const res = quizReducerFunction(initialState, {
      type: "CORRECT_ANSWER",
    });
    expect(res).toStrictEqual({
      ...initialState,
      score: 5,
    });
  });
  it("wrong answer", () => {
    const res = quizReducerFunction(initialState, {
      type: "WRONG_ANSWER",
    });
    expect(res).toStrictEqual({
      ...initialState,
      score: -2,
    });
  });
  it("score", () => {
    const res = quizReducerFunction(initialState, {
      type: "SCORE",
      payload: 2,
    });
    expect(res).toStrictEqual({
      ...initialState,
      score: 2,
    });
  });
  it("reset score", () => {
    const res = quizReducerFunction(initialState, {
      type: "RESET_SCORE",
    });
    expect(res).toStrictEqual({
      ...initialState,
      score: 0,
    });
  });
  it("default", () => {
    const res = quizReducerFunction(initialState, {
      type: "DEFAULT",
    });
    expect(res).toStrictEqual({
      ...initialState,
    });
  });
});

describe("quiz", () => {
  it("quiz category", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Quiz Categories" })
    ).toBeInTheDocument();
  });
});
