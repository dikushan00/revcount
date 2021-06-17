import React from "react";

export const AuthImg = () => {

    return <div className="signup__images">
        <picture>
            <source srcSet={"/img/main/signup-img.svg"} type="image/webp"/>
            <img src={"/img/main/signup-img.svg"} alt="signup"/>
        </picture>
    </div>
}