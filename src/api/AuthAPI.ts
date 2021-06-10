import {instance, loginInstance} from "./API"
import {LoginType, SignUpType} from "../types/userTypes";

export const AuthAPI = {
    //check client auth
    checkAuthMe() {
        return instance.get(`auth/me`).then(res => res.data)
    },
    login(data: LoginType) {
        return loginInstance.post("auth/user/login", data).then(res => res.data)
    },
    signUp(data: SignUpType) {
        return loginInstance.post("auth/sign_up", data).then(res => res.data)
    },
}