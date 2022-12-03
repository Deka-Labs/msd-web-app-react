import axios from "axios"

export type UserCreateInfo = {
    login: string,
    email: string,
    password: string
}

export type UserLoginInfo = {
    email: string,
    password: string
}

export type User = {
    id: number,
    login: string,
    email: string,
}

function api_base(): string {
    const api_base_env = process.env.REACT_APP_LOGIN_SERVICE_ADDRESS
    if (!api_base_env) {
        console.log("Login service not set: provide REACT_APP_LOGIN_SERVICE_ADDRESS env with address")
        alert("Сервис входа не задан")
    }

    return (api_base_env || "") + "/api/v1"
}

function api_route(path: string): string {
    const base = api_base();
    return base + "/" + path
}


export function login_service_signup(create_info: UserCreateInfo) {
    const signup_route = api_route("user")
    return axios.post<User>(signup_route, create_info)
}

export function login_service_login(login_info: UserLoginInfo) {
    const login_route = api_route("user/login")
    return axios.post<User>(login_route, login_info)
}