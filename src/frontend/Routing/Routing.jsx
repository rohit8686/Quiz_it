import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Quiz } from "../pages/Quiz/Quiz";
import { Results } from "../pages/Results/Results";
import { Rules } from "../pages/Rules/Rules";
import { Signup } from "../pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/quiz/:quizName" element={<Quiz />} />
        <Route path="/quiz/rules/:quizName" element={<Rules />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  );
};
