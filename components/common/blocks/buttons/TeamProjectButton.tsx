import React, {ButtonHTMLAttributes} from 'react';

export const TeamProjectButton:React.FC<ButtonHTMLAttributes<any>> = (props) => {
    return <button {...props} className="team-project__btn btn-2">{props.children}</button>
}
