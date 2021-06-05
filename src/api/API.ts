import axios from "axios";

/**
 * our api - http://185.237.165.243:8000/api/v1/
 * requests to our api with token
 */
export const instance = axios.create({
    baseURL: 'http://185.237.165.243:8000/api/v1/',
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("client_token")
    }
})
/** login */
export const loginInstance = axios.create({
    baseURL: 'http://185.237.165.243:8000/api/v1/'
})
