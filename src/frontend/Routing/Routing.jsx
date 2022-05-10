import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
