import { useMutation } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message";
import { useNavigate } from "react-router-dom";
import { API, AuthKeys } from "../../services/api";
import jwt_decode from "jwt-decode";
import { IUser, useAuthContext } from "../../context/AuthContext";
import { AxiosHeaders } from "axios";

export interface ILoginCredentials {
    email: string;
    password: string;
}

interface IAuthResponse {
    config: object;
    data: string;
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}

export const useLogin = (messageApi: MessageInstance) => {
    const navigate = useNavigate();
    const { setAuthTokens, setUser } = useAuthContext();
    const login = useMutation({
        mutationFn: (loginCredentials: ILoginCredentials) => {
            return API.post<ILoginCredentials, IAuthResponse>(AuthKeys.LOGIN, loginCredentials);
        },
        onSuccess: (responseData) => {
            const token: string = responseData.data;
            setAuthTokens(token);
            const decodedUser: IUser = jwt_decode(token);
            setUser(decodedUser);

            localStorage.setItem("authTokens", JSON.stringify(token));

            navigate("/home", { replace: true });
        },
        onError: () => {
            messageApi.error("You provided wrong credentials!");
        },
    });
    return login;
};
