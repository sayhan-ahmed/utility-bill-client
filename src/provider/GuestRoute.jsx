import React, { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "./AuthContext";
import Loader from "../components/Loader/Loader";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (user && user?.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
