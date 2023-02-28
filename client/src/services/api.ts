import axios from 'axios';

class ApiCaller {
    private apiPath: string;
    
    constructor(urlSchema: string){
        const apiPort = process.env.REACT_APP_BACKEND_PORT 
        ? process.env.REACT_APP_BACKEND_PORT
        : 8000;

        this.apiPath = `${urlSchema}:${apiPort}`;
    }

    getApiPath(endpoint: string){
        return `${this.apiPath}/api/${endpoint}`;
    }

    get<TData, T>(endpoint: string, data?: TData){
        return axios.get<T>(this.getApiPath(endpoint), {
            params: data,
        })
        .then((response) => response.data);
    }

    post<TData, T>(endpoint: string, data?: TData){
        return axios.post<T>(this.getApiPath(endpoint), data, {
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