import React from "react";
import Head from "next/head";
import {Header} from "../header/Header";
import {Content} from "../content/Content";
import {SidebarRight} from "../sidebars/SidebarRight";
import {Sidebar} from "../sidebars/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import {ProjectAPI} from "../../src/api/ProjectAPI";
import {actionsProjects} from "../../src/redux/projects-reducer";
import {ProfileAPI} from "../../src/api/ProfileAPI";
import {actionsProfile} from "../../src/redux/profile-reducer";

//main layout with sidebars, header and content
export const MainLayOut: React.FC<{ title: string, isProjectSideBarMode?: boolean }> = ({
                                                                                           children,
                                                                                           title = "Revcount",
                                                                                           isProjectSideBarMode = true
                                                                                       }) => {
    const projects = useSelector((state: AppStateType) => state.projects.projects)
    const invitations = useSelector((state: AppStateType) => state.projects.invitations)
    const statuses = useSelector((state: AppStateType) => state.projects.statuses)
    const profile = useSelector((state: AppStateType) => state.profile.profile)

    const dispatch = useDispatch()

    React.useEffect(() => {
        !projects && ProjectAPI.getProjects().then(res => {
            !res?.error && dispatch(actionsProjects.setProjects(res))
        })
    }, [projects])

    React.useEffect(() => {
        !statuses && ProjectAPI.getStatuses().then(res => {
            !res?.error && dispatch(actionsProjects.setStatuses(res))
        })
    }, [statuses])

    React.useEffect(() => {
        !profile && ProfileAPI.getProfile().then(res => {
            !res?.error && dispatch(actionsProfile.setProfile(res))
        })
    }, [profile])

    React.useEffect(() => {
        !invitations && ProjectAPI.getInvitations().then(res => {
            !res?.error && dispatch(actionsProjects.setInvitations(res))
        })
    }, [invitations])

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
