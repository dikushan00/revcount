import React from "react";
import Head from "next/head";
import {Header} from "../header/Header";
import {Content} from "../content/Content";
import {SidebarRight} from "../sidebars/SidebarRight";
import {Sidebar} from "../sidebars/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {getInvitations, getProjects} from "../../src/redux/projects-reducer";
import {Redirect} from "../common/tools/Router";
import {Page, PageWrapper, Wrapper} from "../styled/mainPage/components";
import {getIsAuth} from "../../src/redux/auth-selector";
import {getUserId} from "../../src/redux/projects-selector";

//main layout with sidebars, header and content
export const MainLayOut: React.FC<{ title: string, isProjectSideBarMode?: boolean }> = ({
                                                                                            children,
                                                                                            title = "Revcount",
                                                                                            isProjectSideBarMode = true
                                                                                        }) => {
    const userId = useSelector(getUserId)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (userId) {
            dispatch(getProjects(userId))
            dispatch(getInvitations(userId))
        }
    }, [userId])

    if (!isAuth) return <Redirect to="sign-up"/>

    return <>
        <Head>
            <title>{title} | Revcount</title>
        </Head>

        <Wrapper className={"wrapper"}>
            <Sidebar/>
            <Page>
                <Header/>
                <PageWrapper>
                    <Content>
                        {children}
                    </Content>
                    {isProjectSideBarMode && <SidebarRight/>}
                </PageWrapper>
            </Page>
        </Wrapper>
    </>
}
