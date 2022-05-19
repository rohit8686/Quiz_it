import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const location = useLocation();

  return (
    <div>
      {JSON.parse(localStorage.getItem("user")) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
      )}
    </div>
  );
};
