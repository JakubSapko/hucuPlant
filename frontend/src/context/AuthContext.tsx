import {useState, useEffect, createContext, useContext, ReactNode} from 'react';

interface IAuthContext {
    username: string | null;
}

const AuthContext = createContext<IAuthContext>({
    username: null
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps ) => {

    const contextValue: IAuthContext = {
        username: ""
    }
    
    return <AuthContext.Provider value={contextValue}> {children} </AuthContext.Provider>
}