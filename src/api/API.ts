import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://revcount-server.herokuapp.com/api/v1/',
    // withCredentials: true
})

export const loginInstance = axios.create({
    baseURL: 'https://revcount-server.herokuapp.com/api/v1/',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "/",
    },
})
