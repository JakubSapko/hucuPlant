import { useMutation } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message";
import { useNavigate } from "react-router-dom";
import { API, AuthKeys } from "../../services/api";
import jwt_decode from "jwt-decode";
import { IAuthTokens, IUser, useAuthContext } from "../../context/AuthContext";

export interface ILoginCredentials {
    email: string;
    password: string;
}

export const useLogin = (messageApi: MessageInstance) => {
    const navigate = useNavigate();
    const { setAuthTokens, setUser } = useAuthContext();
    const login = useMutation({
        mutationFn: (loginCredentials: ILoginCredentials) =>
            API.post<ILoginCredentials, IAuthTokens>(
                AuthKeys.LOGIN,
                loginCredentials
            ),
        onSuccess: (data) => {
            setAuthTokens(data.data);
            const decodedUser: IUser = jwt_decode(data.data.accessToken);
            setUser(decodedUser);
            localStorage.setItem("authTokens", JSON.stringify(data));

            messageApi.success("Welcome to our app!");
            navigate("/home", { replace: true });
        },
        onError: () => {
            messageApi.error("You provided wrong credentials!");
        },
    });
    return login;
};
