import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useTheme } from "../../contexts/theme-context";

export const Navbar = () => {
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex space-between p-1 nav">
      <Link to="/" className="link">
        <h1 className="main-text">QuizIt</h1>
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
        {theme === "light" ? (
          <span
            className="material-icons-outlined"
            onClick={() => setTheme("dark")}
          >
            <abbr title="dark mode" className="theme">
              dark_mode
            </abbr>
          </span>
        ) : (
          <span
            className="material-icons-outlined"
            onClick={() => setTheme("light")}
          >
            <abbr title="light mode" className="theme">
              light_mode
            </abbr>
          </span>
        )}
      </div>
    </nav>
  );
};
