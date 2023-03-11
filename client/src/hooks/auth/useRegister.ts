import { useMutation } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message";
import { API, AuthKeys } from "../../services/api";

export interface IRegisterCredentials {
    username: string;
    password: string;
    email: string;
}
export const useRegister = (messageApi: MessageInstance) => {
    const register = useMutation({
        mutationFn: (reigsterCredentials: IRegisterCredentials) =>
            API.post(AuthKeys.REGISTER, reigsterCredentials),
        onSuccess: () => {
            messageApi.success(
                "Your profile was created! Proceed to the login screen."
            );
        },
        onError: () => {
            messageApi.error("Something went wrong!");
        },
    });
    return register;
};
