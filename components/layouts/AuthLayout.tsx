import React from "react";
import Head from "next/head";
import {useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import Preloader from "../common/preloader/Preloader";
import {getIsAuth} from "../../src/redux/auth-selector";
import {useRouter} from "next/router";

export const AuthLayout: React.FC<{title: string}> = ({children, title}) => {

    const isAuth = useSelector(getIsAuth)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const router = useRouter()

    if (isAuth) router.push("/")

    if(isFetching) return <Preloader theme />

    return <>
        <Head>
            <title>{title} | Revcount</title>
        </Head>
        {children}
    </>
}