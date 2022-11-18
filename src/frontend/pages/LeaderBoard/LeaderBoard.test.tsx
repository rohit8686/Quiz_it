import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/auth-context";
import { QuizProvider } from "../../contexts/quiz-context";
import { ThemeProvider } from "../../contexts/theme-context";
import { LeaderBoard } from "./LeaderBoard";

describe("leaderboard", () => {
  it("leader", () => {
    // render(
    //   <QuizProvider>
    //     <LeaderBoard />
    //   </QuizProvider>
    // );
    // expect(screen.getByText("User")).toBeInTheDocument();
  });
});
