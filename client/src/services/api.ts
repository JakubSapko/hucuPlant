import axios from 'axios';

export enum PlantKeys {
    BASE = 'plant/',
}

export enum AuthKeys {
    REGISTER = 'auth/register/',
    LOGIN = 'auth/login',
    REFRESH_TOKEN = 'auth/refresh/'
}
class ApiCaller {
    private apiPath: string;
    
    constructor(urlSchema: string){
        const apiPort = process.env.REACT_APP_BACKEND_PORT 
        ? process.env.REACT_APP_BACKEND_PORT
        : 3000;

        this.apiPath = `${urlSchema}:${apiPort}`;
    }

    getApiPath(endpoint: string){
        return `${this.apiPath}/${endpoint}`;
    }

    get<T>(endpoint: string, data?: string){
        return axios.get<T>(this.getApiPath(endpoint), {
            params: data,
        })
        .then((response) => response.data);
    }

    post<TData, T>(endpoint: string, data?: TData){
        return axios.post<TData, T>(this.getApiPath(endpoint), data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    delete<TData, T>(endpoint: string, data?: TData){
        return axios.delete<T>(this.getApiPath(endpoint), { data })
    }

    update<TData, T>(endpoint: string, data?: TData){
        return axios.put<T>(this.getApiPath(endpoint), data);
    }
}

export const API = new ApiCaller(process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME : 'http://localhost');