import React from "react";
import {instance} from "../../api/API";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store-redux";

type MethodsNamesType = "get" | "post" | "put" | "patch" | "delete"
export const useHttp = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const token = useSelector((state: AppStateType) => state.auth.token)

    const request = React.useCallback(async <T extends any>(url: string, method: MethodsNamesType = "get",
                                                            body: {} = {},
                                                            headers: {} | null = {} , isTokenRequired: boolean = true) => {
        if(!token && isTokenRequired) {
            setError("Please refresh the page!")
            return
        }
        let defaultHeaders = {
            "Authorization": "Bearer " + (token || localStorage.getItem("token"))
        }
        setLoading(true)

        try {
            //@ts-ignore
            const response = await instance[method](url, body, {...headers, ...defaultHeaders})
            const data: T = await response.data
            if (!response.data) {
                //@ts-ignore
                throw new Error(response?.message && data.message || "Что-то пошло не так")
            }
            setLoading(false)
            return data
        } catch (e) {
            let errorMessage = e.response?.data?.message
            setLoading(false)
            setError(errorMessage || e.message)
            // throw e
        }
    }, [token])

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}