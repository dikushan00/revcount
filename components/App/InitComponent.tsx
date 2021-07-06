import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {init} from "../../src/redux/app-reducer";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Preloader from "../common/preloader/Preloader";
import {getIsInitialized} from "../../src/redux/app-selector";

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY || "pk_test_51J7XLSFfeOYPUTvZDrudcCT6g6pg00SAwhC7o1aLhx0NatLEZf4KGER3gL8f8MSEfayqavtHiXZn7PWInk4VN8zZ004YEC2tWJ");

export const InitComponent: React.FC = ({children}) => {

    const dispatch = useDispatch();
    const initialized = useSelector(getIsInitialized);

    React.useEffect(() => {
        dispatch(init());
    }, []);

    if (!initialized) {
        return <Preloader theme/>;
    }

    return <>
        <Elements stripe={stripePromise}>{children}</Elements>
    </>
}
