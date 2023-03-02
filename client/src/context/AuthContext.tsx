import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import jwt_decode from "jwt-decode";

interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  authTokens: IAuthTokens | null;
  setAuthTokens: Dispatch<SetStateAction<IAuthTokens | null>>;
}

export interface ICredentials {
  email: string,
  username: string,
  password: string
}

export interface IUser {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  authTokens: null,
  setAuthTokens: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export interface IAuthTokens {
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

  const contextValue: IAuthContext = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens, 
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
