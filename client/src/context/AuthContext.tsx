import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface IAuthContext {
  user: IUser | null;
  authTokens: IAuthTokens | null;
  logInUser: (username: string, password: string) => void;
  logOutUser: () => void;
  registerUser: (credentials: ICredentials) => void;
  fetching: boolean;
}

export interface ICredentials {
  email: string,
  username: string,
  password: string
}

interface IUser {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  authTokens: null,
  logInUser: () => {},
  logOutUser: () => {},
  registerUser: () => {},
  fetching: false
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

interface IAuthTokens {
  [key: string]: string;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authTokens, setAuthTokens] = useState<IAuthTokens | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      if (storedTokens !== null) {
        const localStorageData = JSON.parse(storedTokens);
        setUser(jwt_decode(localStorageData.accessToken));
      }
    } else {
      setUser(null);
    }
  }, []);


  let navigate = useNavigate();

  const logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/", { replace: true });
  };

  const logInUser = async (username: string, password: string) => {

    setFetching(true);

    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();


    if (response.status !== 200) {
      console.log(`[${data.success}]: ${data.error}`);
      setTimeout(() => {
        message.error('Invalid credentials!')
      }, 1500)
      setFetching(false);
      return;
    } 
    setAuthTokens(data);
    const decodedUser: IUser = jwt_decode(data.accessToken);
    setUser(decodedUser);
    localStorage.setItem("authTokens", JSON.stringify(data));
    navigate("/home", { replace: true });

    setFetching(false);
    setTimeout(() => {
      message.success('Log in successfull!')
    }, 1500);

  };

  const registerUser = async (credentials: ICredentials) => {
    const { email, username, password } = credentials;

    setFetching(true);

    const response = await fetch("http://localhost:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, username: username, password: password})
    });

    const responseData = await response.json();

    if (response.status !== 200){
      setFetching(false);
      setTimeout(() => {
        message.error('Couldn\'t create your account, sorry!')
      }, 1500)
      return responseData.body;
    }

    setFetching(false);
    setTimeout(() => {
      message.success('Account created successfully!')
    }, 1500);
  }

  const contextValue: IAuthContext = {
    user: user,
    authTokens: authTokens,
    logInUser: logInUser,
    logOutUser: logOutUser,
    registerUser: registerUser,
    fetching: fetching
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
