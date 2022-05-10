import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { toastContainer } from "../../Components/Toast/Toast";

export function Login() {
  const {
    signin,
    authState: { email, password, errorMsg },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="card card-width p-2">
        <h2 className="text-center">Login</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await signin(email, password);
              navigate("/", { replace: true });
              toastContainer("Login successfull", "success");
            } catch (error) {
              if (error.code === "auth/wrong-password") {
                authDispatch({ type: "ERROR", payload: "Incorrect password" });
              } else if (error.code === "auth/user-not-found") {
                authDispatch({ type: "ERROR", payload: "Incorrect email" });
              }
              console.log(error);
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
              required
              value={email}
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
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
              required
              value={password}
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <div className="pt-1 pb-1 flex flex-start small-gap">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <div className="pt-1">
            <Link to="/login" className="link text-info">
              Forgot your Password ?
            </Link>
          </div>
          <div className="pt-1">
            <button className="btn btn-primary full-width mt-1">Login</button>
          </div>
          &nbsp;
          <p
            className="flex outline-btn"
            onClick={() => authDispatch({ type: "TEST_CREDENTIALS" })}
          >
            Login with test credentials
          </p>
          <h3 className="flex pt-1 incorrect">{errorMsg}</h3>
          <Link to="/signup" className="link">
            <div className="flex small-gap">
              Create new Account
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
