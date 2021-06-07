import axios from "axios";

/**
 * our api -
 * requests to our api with token
 */
export const instance = axios.create({
    baseURL: 'http://localhost:4500/',
    // headers: {
    //     "Authorization": "Bearer " + localStorage.getItem("client_token")
    // }
})
/** login */
export const loginInstance = axios.create({
    baseURL: 'http://localhost:4500/'
})
