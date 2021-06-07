import React, {ButtonHTMLAttributes} from 'react';

export const ProjectsButton:React.FC<ButtonHTMLAttributes<any>> = (props) => {
    return <button {...props} className="projects__btn btn">{props.children}</button>
}
