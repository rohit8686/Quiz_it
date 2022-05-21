import React from "react";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../../Components/Toast/Toast";
import { useAuth } from "../../contexts/auth-context";

export const UserProfile = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const lastLogin = currentUser?.metadata.lastSignInTime;

  return (
    <div className="card card-width p-1">
      <h2>Profile</h2>
      <hr className="hr" />
      <h3>
        <strong>Email : </strong>
        {currentUser?.email}
      </h3>
      <p className="pt-1">Last login : {lastLogin}</p>
      <div className="pt-1">
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
      </div>
    </div>
  );
};
