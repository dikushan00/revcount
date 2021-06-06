import React from "react";
//
// //make request hook
// export const useHttp = () => {
//
//     const [loading, setLoading] = React.useState(false)
//     const [error, setError] = React.useState(null)
//
//     const request = React.useCallback(async (url: string, method: string = "GET",
//                                              body: {} = {},
//                                              headers = {}) => {
//         setLoading(true)
//         try {
//             //@ts-ignore
//             const response = await fetch(method, body, headers)
//             const data = await response.json()
//             if (!response.ok) {
//                 throw new Error(data.message || "Что-то пошло не так")
//             }
//             setLoading(false)
//             return data
//         } catch (e) {
//             setLoading(false)
//             setError(e.message)
//             throw e
//         }
//     }, [])
//
//     const clearError = () => setError(null)
//
//     return {loading, request, error, clearError}
// }