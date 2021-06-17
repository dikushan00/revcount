import React from "react";

export const ImgWrapper: React.FC<{path: string}> = ({path}) => {
    return <picture>
        <source srcSet={path} type="image/webp"/>
        <img src={path} alt="signup"/>
    </picture>
}