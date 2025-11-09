import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader/Loader";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (user?.email) return children;

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
