import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { LeaderBoard } from "../pages/LeaderBoard/LeaderBoard";
import { Login } from "../pages/Login/Login";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { Quiz } from "../pages/Quiz/Quiz";
import { Results } from "../pages/Results/Results";
import { Rules } from "../pages/Rules/Rules";
import { Signup } from "../pages/Signup/Signup";
import { UserProfile } from "../pages/UserProfile/UserProfile";
import { PrivateRoute } from "./PrivateRoute";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/quiz/:quizName" element={<Quiz />} />
        <Route path="/quiz/rules/:quizName" element={<Rules />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Route>
    </Routes>
  );
};
