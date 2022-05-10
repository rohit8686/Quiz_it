import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { toastContainer } from "../Toast/Toast";

export const Navbar = () => {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();

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
          <button
            className="btn btn-error"
            onClick={async () => {
              await signout();
              navigate("/", { replace: true });
              toastContainer("Logged out", "error");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="link">
            <button className="btn btn-error">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
