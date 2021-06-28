import React from 'react';
import {useDispatch} from "react-redux";
import {init} from "../../src/redux/app-reducer";

export const InitComponent: React.FC = ({children}) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(init());
    }, []);
    return <>
        {children}
    </>
}
