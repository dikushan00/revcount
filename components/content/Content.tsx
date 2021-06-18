import React from "react";
import {PageContent} from "../styled/mainPage/components";

export const Content:React.FC = ({children}) => {
    return <PageContent>
        {children}
    </PageContent>
};