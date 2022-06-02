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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      if (storedTokens !== null) {
        const localStorageData = JSON.parse(storedTokens);
        setUser(jwt_decode(localStorageData.access));
      }
    } else {
      setUser(null);
    }
  }, []);

//   13724
  useEffect(() => {
    if (loading){
      updateToken();
    }

    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
        if(authTokens){
            updateToken();
        }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  let navigate = useNavigate();

  const logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login", { replace: true });
  };

  const logInUser = async (username: string, password: string) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      const decodedUser: IUser = jwt_decode(data.access);
      setUser(decodedUser);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/home", { replace: true });
    } else {
      console.log("something went wrong");
    }
  };

  const updateToken = async () => {

    const refreshToken = authTokens?.refresh;
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({refresh: refreshToken}),
    });
    const data = await response.json();
    if (response.status === 200){
        setAuthTokens(data);
        const decodedUser: IUser = jwt_decode(data.access);
        setUser(decodedUser);
        localStorage.setItem("authTokens", JSON.stringify(data));
    }else{
        logOutUser();
    }

    if (loading){
      setLoading(false);
    }
  };

  const contextValue: IAuthContext = {
    user: user,
    authTokens: authTokens,
    logInUser: logInUser,
    logOutUser: logOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{loading ? null : children}</AuthContext.Provider>
  );
};
