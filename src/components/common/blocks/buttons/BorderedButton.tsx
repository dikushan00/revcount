import React, {ButtonHTMLAttributes} from "react";

export const BorderedButton:React.FC<ButtonHTMLAttributes<any>> = (props) => {

    return <button {...props} className="main__btn main__btn--2 btn-2">{props.children}</button>
}