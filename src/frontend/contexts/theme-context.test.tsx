import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import { AuthProvider } from "./auth-context";
import { QuizProvider } from "./quiz-context";
import {
  getThemeFromLocalStorage,
  ThemeContext,
  ThemeProvider,
} from "./theme-context";

describe("theme test", () => {
  it("dark theme", () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("dark"));
    expect(screen.getByTestId("dark")).toBeInTheDocument();
    // expect(getThemeFromLocalStorage()).toEqual("dark");
  });
  it("light theme", () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );
    // fireEvent.click(screen.getByTestId("light"));
    fireEvent.click(screen.getByTestId("dark"));
    fireEvent.click(screen.getByTestId("light"));
    expect(screen.getByTestId("light")).toBeInTheDocument();

    // expect(getThemeFromLocalStorage()).toEqual("light");
  });
});
