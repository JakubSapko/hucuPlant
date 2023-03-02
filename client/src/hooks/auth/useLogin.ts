import { useMutation } from "@tanstack/react-query"
import { MessageInstance } from "antd/lib/message";
import { useNavigate } from "react-router-dom";
import { API, AuthKeys } from "../../services/api";
import jwt_decode from "jwt-decode";

export interface ILoginCredentials {
    email: string;
    password: string;
}

export const useLogin = (messageApi: MessageInstance) => {
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: (loginCredentials: ILoginCredentials) => 
            API.post(AuthKeys.LOGIN, loginCredentials),
        onSuccess: () => {
            messageApi.success("Welcome to our app!");
            navigate("/home", {replace: true});
        },
        onError: () => {
            messageApi.error("You provided wrong credentials!")
        }
    });
    return login;
}