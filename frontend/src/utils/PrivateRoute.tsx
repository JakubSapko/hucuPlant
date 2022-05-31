import React from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRouteProps {
  isAuthenticated: boolean;
  outlet: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  isAuthenticated,
  outlet,
}) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: "/login" }} />;
  }
};

export default PrivateRoute;
