import React, {CSSProperties} from 'react'
import {CommonBlockWrapper} from "./CommonBlockWrapper";

type PropsType = {
    style?: CSSProperties,
    className?: string,
    alignItems?: "center",
    justifyContent?: "space-between" | "space-around" | "center" | "normal" | "spaceBetween"
}
//block with flex styles
export const  DivFlex:React.FC<PropsType> = ({children, style = {}, className = "", alignItems = "center", justifyContent = "normal"}) => {
    return (
        <CommonBlockWrapper>
            <div className ={`flex_between ${className}`} style={{...style, justifyContent: justifyContent, alignItems: alignItems}}>
                {children}
            </div>
        </CommonBlockWrapper>
    )
}