
import React from "react";

export const Content:React.FC = ({children}) => {
    return <div className={"page__content"}>
        {children}
    </div>
};