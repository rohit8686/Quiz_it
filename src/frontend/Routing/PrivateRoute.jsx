import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export const PrivateRoute = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
      )}
    </div>
  );
};
