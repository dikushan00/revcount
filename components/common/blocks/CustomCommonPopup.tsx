import React from 'react'

type PropsType = {
    top?: string, left?: string, bottom?: string, right?: string, position?: AbsolutStyleType, width?: string, addClass?: string
}

export const CustomCommonPopup: React.FC<PropsType> = ({
                                                     top, left, bottom,
                                                     children,
                                                     right, position, width,
                                                     addClass
                                                 }) => {
    return (
        <div className={"custom_popup " + addClass}
             style={{position: position || "absolute", left, top, width, right, bottom}}>
            {children}
        </div>
    )
}

export type AbsolutStyleType =
    "absolute"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "-webkit-sticky"
    | "fixed"
    | "relative"
    | "static"
    | "sticky"