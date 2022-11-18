import { QuizProvider } from "../../contexts/quiz-context";
import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import { AuthProvider } from "../../contexts/auth-context";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../../contexts/theme-context";

describe("Home", () => {
  it("home", () => {
    // render(
    //   <BrowserRouter>
    //     <ThemeProvider>
    //       <AuthProvider>
    //         <QuizProvider>
    //           <Login />
    //         </QuizProvider>
    //       </AuthProvider>
    //     </ThemeProvider>
    //   </BrowserRouter>
    // );
    // expect(screen.getByText("User")).toBeInTheDocument();
  });
  // it("sort", () => {
  //   const fn = jest.mock("a");
  // });
});
