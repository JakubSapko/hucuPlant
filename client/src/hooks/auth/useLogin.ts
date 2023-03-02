import { useMutation } from "@tanstack/react-query"
import { MessageInstance } from "antd/lib/message";
import { API, AuthKeys } from "../../services/api";

export interface ILoginCredentials {
    email: string;
    password: string;
}

export const useLogin = (messageApi: MessageInstance) => {
    const login = useMutation({
        mutationFn: (loginCredentials: ILoginCredentials) => 
            API.post(AuthKeys.LOGIN, loginCredentials),
        onSuccess: () => {
            messageApi.success("Welcome to our app!");
        },
        onError: () => {
            messageApi.error("You provided wrong credentials!")
        }
    });
    return login;
}