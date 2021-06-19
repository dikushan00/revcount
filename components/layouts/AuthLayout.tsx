import React from "react";
import Head from "next/head";

export const AuthLayout: React.FC<{title: string}> = ({children, title}) => {

    return <>
        <Head>
            <title>{title} | Revcount</title>
        </Head>
        {children}
    </>
}