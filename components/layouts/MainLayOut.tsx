import React from "react";
import Head from "next/head";
import {Header} from "../header/Header";
import {Content} from "../content/Content";
import {SidebarRight} from "../sidebars/SidebarRight";
import {Sidebar} from "../sidebars/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import {ProjectAPI} from "../../src/api/ProjectAPI";
import {actionsProjects, getInvitations, getProjects} from "../../src/redux/projects-reducer";
import {ProfileAPI} from "../../src/api/ProfileAPI";
import {actionsProfile} from "../../src/redux/profile-reducer";
import {useRouter} from "next/router";
import {Redirect} from "../common/tools/Router";

//main layout with sidebars, header and content
export const MainLayOut: React.FC<{ title: string, isProjectSideBarMode?: boolean }> = ({
                                                                                            children,
                                                                                            title = "Revcount",
                                                                                            isProjectSideBarMode = true
                                                                                        }) => {
    const userId = useSelector((state: AppStateType) => state.auth.userId)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const router = useRouter()

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (userId) {
            dispatch(getProjects(userId))
            dispatch(getInvitations(userId))
        }

    }, [userId])

    React.useEffect(() => {
        ProjectAPI.getStatuses().then(res => {
            !res?.error && dispatch(actionsProjects.setStatuses(res))
        })
        ProfileAPI.getProfile().then(res => {
            !res?.error && dispatch(actionsProfile.setProfile(res))
        })
    }, [])

    if (!isAuth) return <Redirect to = "sign-up" />

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
