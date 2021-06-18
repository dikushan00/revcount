import axios from "axios";

export const instance = process.browser ? axios.create({
    baseURL: 'https://revcount-server.herokuapp.com/api/v1/',
    // withCredentials: true,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}) : axios.create({
    baseURL: 'https://revcount-server.herokuapp.com/api/v1/',
})

export const loginInstance = axios.create({
    baseURL: 'https://revcount-server.herokuapp.com/api/v1/',
})
