import React from "react";
import {instance, loginInstance} from "../../api/API";
import Axios from "axios";

type MethodsNamesType = "get" | "post" | "put" | "patch" | "delete"
export const useHttp = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    let defaultHeaders: any
    if (!process.browser ) {
        debugger
    } else
        defaultHeaders = {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    const makeRequest = (instance: any) => {

        return React.useCallback(async <T extends any>(url: string, method: MethodsNamesType = "get",
                                                       body: {} = {},
                                                       headers = {}) => {

            setLoading(true)
            try {
                //@ts-ignore
                const response = await instance[method](url, body, {...headers, ...defaultHeaders})
                const data: T = await response.data
                if (!response.data) {
                    //@ts-ignore
                    throw new Error(data.message || "Что-то пошло не так")
                }
                setLoading(false)
                return data
            } catch (e) {
                setLoading(false)
                setError(e.message)
                // throw e
            }
        }, [])
    }

    const request = makeRequest(instance)
    const authRequest = makeRequest(loginInstance)

    const clearError = () => setError(null)

    return {loading, request, authRequest, error, clearError}
}