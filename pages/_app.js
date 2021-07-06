import {Provider} from "react-redux";
import {useStore} from "../src/redux/store-redux"
import React from "react";
import "../styles/App.css"
import {InitComponent} from "../components/App/InitComponent";

export default function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <InitComponent>
                <Component {...pageProps} />
            </InitComponent>
        </Provider>
    )
}
