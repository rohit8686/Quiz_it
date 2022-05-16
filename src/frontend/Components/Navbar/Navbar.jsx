import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

export const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="flex space-between p-1 nav">
      <Link to="/" className="link">
        <h1 className="main-text gradient-text">QuizIt</h1>
      </Link>
      <div className="flex">
        <Link to="/rules" className="link">
          <h3>Rules</h3>
        </Link>
        {currentUser ? (
          <Link to="/profile" className="link">
            <span className="material-icons-outlined">account_circle</span>
          </Link>
        ) : (
          <Link to="/login" className="link">
            <button className="btn btn-error">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
