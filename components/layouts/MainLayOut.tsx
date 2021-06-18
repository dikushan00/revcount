import React from "react";
import Head from "next/head";
import {Header} from "../header/Header";
import {Content} from "../content/Content";
import {SidebarRight} from "../sidebars/SidebarRight";
import {Sidebar} from "../sidebars/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import {getInvitations, getProjects} from "../../src/redux/projects-reducer";
import {actionsProfile} from "../../src/redux/profile-reducer";
import {Redirect} from "../common/tools/Router";
import {useHttp} from "../../src/utils/hooks/http.hook";
import {ProfileType} from "../../src/types/userTypes";
import {Page, PageWrapper, Wrapper} from "../styled/mainPage/components";
import {checkAuthMe} from "../../src/redux/auth-reducer";

//main layout with sidebars, header and content
export const MainLayOut: React.FC<{ title: string, isProjectSideBarMode?: boolean }> = ({
                                                                                            children,
                                                                                            title = "Revcount",
                                                                                            isProjectSideBarMode = true
                                                                                        }) => {
    const userId = useSelector((state: AppStateType) => state.auth.userId)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const {request, error} = useHttp()

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (userId) {
            dispatch(getProjects(userId))
            dispatch(getInvitations(userId))
        } else {
             dispatch(checkAuthMe())
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
