import "../Login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { toastContainer } from "../../Components/Toast/Toast";

export function Signup() {
  const {
    signup,
    authState: { email, password, errorMsg },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="card card-width p-2">
        <h2 className="text-center">Signup</h2>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              await signup(email, password);
              navigate("/", { replace: true });
              toastContainer("Sign in successfull", "success");
            } catch (error) {
              if (error.code === "auth/email-already-in-use") {
                authDispatch({
                  type: "ERROR",
                  payload: "Email already exists",
                });
                setTimeout(() => authDispatch({ type: "CLEAR_ERROR" }), 4000);
                authDispatch({ type: "RESET_FORM" });
              }
              console.error(error);
            }
          }}
        >
          <div className="pt-1">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abcd@gmail.com"
              className="input"
              value={email}
              required
              onChange={(e) => {
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
                authDispatch({ type: "EMAIL", payload: e.target.value });
              }}
            />
          </div>
          <div className="pt-1">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="input"
              minLength={6}
              value={password}
              required
              onChange={(e) => {
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
                authDispatch({ type: "PASSWORD", payload: e.target.value });
              }}
            />
          </div>
          <div className="pt-1 pb-1">
            <input type="checkbox" name="checkbox" id="checkbox" required />
            &nbsp;
            <label htmlFor="checkbox">I accept all terms & conditions</label>
          </div>
          <div className="pt-1">
            <button className="btn btn-primary full-width mt-1">
              Create Account
            </button>
          </div>
          <h3 className="flex pt-1 incorrect">{errorMsg}</h3>
          <Link to="/login" className="link">
            <div className="flex small-gap">
              Already have an account
              <span className="material-icons-outlined icon chevron-right">
                chevron_right
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
