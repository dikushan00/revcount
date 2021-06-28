import {Provider} from "react-redux";
import {useStore} from "../src/redux/store-redux"
import NextNProgress from "nextjs-progressbar";
import React from "react";
import "../styles/App.css"
import {InitComponent} from "../components/App/InitComponent";

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
            <InitComponent>
                <Component {...pageProps} />
            </InitComponent>
        </Provider>
    )
}
