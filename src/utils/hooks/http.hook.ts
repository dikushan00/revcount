import React from "react";
import {instance} from "../../api/API";

type MethodsNamesType = "get" | "post" | "put" | "patch" | "delete"
export const useHttp = () => {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const request = React.useCallback(async (url: string, method: MethodsNamesType = "get",
                                             body: {} = {},
                                             headers = {}) => {
        setLoading(true)
        try {
            //@ts-ignore
            const response = await instance[method](url, body, headers)
            const data = await response.data
            if (!response.data) {
                throw new Error(data.message || "Что-то пошло не так")
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}