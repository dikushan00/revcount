import React, {ButtonHTMLAttributes} from "react";

export const FilledButton:React.FC<ButtonHTMLAttributes<any>> = ( props) => {

    return <button {...props} className="main__btn main__btn--1 btn">{props.children}</button>
}