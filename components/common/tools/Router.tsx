import React from "react";
import {useRouter} from "next/router";

export const Redirect: React.FC<{ to: string }> = ({to}) => {
    const Router = useRouter()
    React.useEffect(() => {
        Router.push(`/${to}`)
    }, [])

    return <></>
}
