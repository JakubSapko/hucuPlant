import axios from "axios";

export enum PlantKeys {
    BASE = "plants/",
}

export enum AuthKeys {
    REGISTER = "auth/register/",
    LOGIN = "auth/login",
    REFRESH_TOKEN = "auth/refresh/",
}

export enum UserKeys {
    BASE = "user/",
}
class ApiCaller {
    private apiPath: string;

    constructor(urlSchema: string) {
        const apiPort = import.meta.env.VITE_APP_BACKEND_PORT
            ? import.meta.env.VITE_APP_BACKEND_PORT
            : 3000;

        this.apiPath = `${urlSchema}:${apiPort}`;
    }

    getApiPath(endpoint: string) {
        return `${this.apiPath}/${endpoint}`;
    }

    get<T>(endpoint: string, data?: string) {
        return axios
            .get<T>(this.getApiPath(endpoint), {
                params: data,
            })
            .then((response) => response.data);
    }

    post<TData, T>(endpoint: string, data?: TData) {
        return axios.post<TData, T>(this.getApiPath(endpoint), data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    }

    delete<TData, T>(endpoint: string, data?: TData, id?: number) {
        const url = id
            ? `${this.getApiPath(endpoint)}${id}`
            : this.getApiPath(endpoint);
        return axios.delete<T>(url, { data });
    }

    update<TData, T>(endpoint: string, data?: TData) {
        return axios.put<T>(this.getApiPath(endpoint), data);
    }
}

export const API = new ApiCaller(
    import.meta.env.VITE_APP_HOSTNAME
        ? import.meta.env.VITE_APP_HOSTNAME
        : "http://localhost"
);
