import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./frontend/contexts/auth-context";
import { QuizProvider } from "./frontend/contexts/quiz-context";
import { ThemeProvider } from "./frontend/contexts/theme-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

reportWebVitals();
