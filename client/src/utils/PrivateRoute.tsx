import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface IPrivateRouteProps {
    outlet: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ outlet }) => {
    const { isAuthenticated } = useAuthContext();
    if (isAuthenticated) {
        return <>{outlet}</>;
    } else {
        return <Navigate to={{ pathname: "/" }} />;
    }
};

export default PrivateRoute;
