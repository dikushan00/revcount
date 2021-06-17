import {instance, loginInstance} from "./API"
import {LoginType, SignUpType} from "../types/userTypes";

export const AuthAPI = {
    login(data: LoginType) {
        return loginInstance.post<{token: string}>("users/token", data).then(res => res.data)
    },
    signUp(data: SignUpType) {
        return loginInstance.post<{ "user_id": number, username: string, error: any, first_name: string, token: string }>("users/register", data).then(res => res.data)
    },
}