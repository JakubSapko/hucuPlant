import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    useMemo,
} from "react";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    logoutUser: () => void;
    authTokens: string | null;
    setAuthTokens: Dispatch<SetStateAction<string | null>>;
    isAuthenticated: boolean;
}

export interface ICredentials {
    email: string;
    username: string;
    password: string;
}

export interface IUser {
    exp: number;
    iat: number;
    id: number;
    email: string;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    logoutUser: () => {},
    authTokens: null,
    setAuthTokens: () => {},
    isAuthenticated: false
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export interface IAuthTokens {
    token: string;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authTokens, setAuthTokens] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    const isAuthenticated = useMemo((): boolean => {
        const storedTokens = localStorage.getItem("authTokens");
        if (storedTokens) {
            const localStorageData = JSON.parse(storedTokens);
            setUser(jwt_decode(localStorageData));
            setAuthTokens(localStorageData);
            return true;
        } else {
            setUser(null);
            return false;
        }
    }, []);


    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/", { replace: true });
    };

    const contextValue: IAuthContext = {
        user: user,
        setUser: setUser,
        logoutUser: logoutUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        isAuthenticated: isAuthenticated,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
