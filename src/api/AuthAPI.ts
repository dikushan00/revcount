import {instance, loginInstance} from "./API"
import {LoginType} from "../types/userTypes";

export const AuthAPI = {
    //check client auth
    checkAuthMe() {
        return instance.get(`auth/me`).then(res => res.data)
    },
    login(data: LoginType) {
        return loginInstance.post("auth/user/login", data).then(res => res.data)
    },
}