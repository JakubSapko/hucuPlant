import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

interface IAuthContext {
  user: IUser | null;
  authTokens: IAuthTokens | null;
  logInUser: (username: string, password: string) => void;
  logOutUser: () => void;
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

    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();


    if (response.status === 200) {
      setAuthTokens(data);
      const decodedUser: IUser = jwt_decode(data.accessToken);
      setUser(decodedUser);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/home", { replace: true });
    } else {
      console.log(`[${data.success}]: ${data.error}`);
    }
  };


  const contextValue: IAuthContext = {
    user: user,
    authTokens: authTokens,
    logInUser: logInUser,
    logOutUser: logOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
