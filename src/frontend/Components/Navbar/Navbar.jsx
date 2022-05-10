import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav class="flex space-between p-1 nav">
      <Link to="/" className="link">
        <h1 class="main-text gradient-text">QuizIt</h1>
      </Link>
      <div class="flex">
        <Link to="/rules" className="link">
          <h3>Rules</h3>
        </Link>
        <Link to="/login" className="link">
          <button class="btn btn-error">Login</button>
        </Link>
      </div>
    </nav>
  );
};
