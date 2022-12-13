import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { PlantsContextProvider } from "../context/PlantsContext";

interface IPrivateRouteProps {
  outlet: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ outlet }) => {
  const { user } = useAuthContext();
  const isAuthenticated = user ? true : false;

  if (isAuthenticated) {
    return <PlantsContextProvider>{outlet}</PlantsContextProvider>;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
};

export default PrivateRoute;
