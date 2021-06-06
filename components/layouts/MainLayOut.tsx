import React from "react";
import Head from "next/head";
import {Header} from "../header/Header";
import {Content} from "../content/Content";
import {SidebarRight} from "../sidebars/SidebarRight";
import {Sidebar} from "../sidebars/Sidebar";

//main layout with sidebars, header and content
export const MainLayOut: React.FC<{ title: string, isProjectSideBarMode?: boolean }> = ({
                                                                                           children,
                                                                                           title = "Revcount",
                                                                                           isProjectSideBarMode = true
                                                                                       }) => {
    return <>
        <Head>
            <title>{title} | Revcount</title>
        </Head>

        <div className={"wrapper"}>
            <Sidebar/>
            <main className="page">
                <Header/>
                <div className="page__wrapper">
                    <Content>
                        {children}
                    </Content>
                    {isProjectSideBarMode && <SidebarRight/>}
                </div>
            </main>
        </div>
    </>
}
