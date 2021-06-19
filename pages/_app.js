import {Provider} from "react-redux";
import {useStore} from "../src/redux/store-redux"

import "../styles/App.css"
import NextNProgress from "nextjs-progressbar";
import React from "react";

export default function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <NextNProgress
                color="yellow"
                startPosition={0.3}
                stopDelayMs={200}
                height={2}
            />
            <Component {...pageProps} />
        </Provider>
    )
}
