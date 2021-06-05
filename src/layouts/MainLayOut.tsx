import React from "react";
import {Content} from "../components/content/Content";
import {Header} from "../components/header/Header";
import {Switch} from "react-router-dom";
import {SidebarRight} from "../components/sidebars/SidebarRight";

//main layout with sidebars, header and content
export const MainLayOut: React.FC = ({children}) => {

    return (
        <>
            <Header/>
            <div className="page__wrapper">
                <Content>
                    {children}
                </Content>
                <SidebarRight/>
            </div>
        </>
    )
}
