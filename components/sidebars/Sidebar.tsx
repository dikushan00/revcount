import React from "react"
import Link from 'next/link'
import {CreateNewProjectModal} from "../projects/addProject/CreateNewProjectModal";
import {InviteStatusType, ProjectType} from "../../src/types/projectTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import {actionsProjects} from "../../src/redux/projects-reducer";
import {AcceptInvitationModal} from "../projects/modals/AcceptInvitationModal";
import {getInvitations, getUserId} from "../../src/redux/projects-selector";
import {useHttp} from "../../src/utils/hooks/http.hook";

type ActionNamesType = "projects" | "invitations"

export const Sidebar = () => {

    const [isAddNewProjectModalMode, setIsAddNewProjectModalMode] = React.useState(false)
    const [activeAction, setActiveAction] = React.useState<ActionNamesType>("projects")

    const projects = useSelector((state: AppStateType) => state.projects.projects)
    const invitations = useSelector((state: AppStateType) => state.projects.invitations)

    const handleAddNewProject = () => {
        setIsAddNewProjectModalMode(true)
    }
    const handleCloseModal = () => {
        setIsAddNewProjectModalMode(false)
    }
    const handleChangeAction = (action: ActionNamesType) => {
        setActiveAction(action)
    }

    return <>
        <aside className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <Link href="/">
                        <a className="sidebar__logo-link">
                            <picture>
                                <source srcSet={"/img/icons/logo.svg"} type="image/webp"/>
                                <img src={"/img/icons/logo.svg"} alt="logo"/>
                            </picture>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="sidebar__content">
                <div className="sidebar__actions">
                    <button onClick={() => handleChangeAction("projects")}
                            className={"sidebar__btn sidebar__btn--1 btn-3 " + (activeAction === "projects" ? "active" : "")}>Projects
                    </button>
                    <button onClick={() => handleChangeAction("invitations")}
                            className={"sidebar__btn sidebar__btn--2 btn-3 " + (activeAction === "invitations" ? "active" : "")}>
                        Invitations
                        {invitations && invitations?.length > 0 &&
                        <span className="sidebar__span">{invitations?.length}</span>}
                    </button>
                </div>
                {
                    activeAction === "projects" &&
                    <Projects projects={projects} handleAddNewProject={handleAddNewProject}/>
                }
                {
                    activeAction === "invitations" && <InvitationProjects/>
                }
            </div>
            <div className="sidebar__footer">
                <button className="sidebar__footer-btn ">
                    Upgrade to premium
                    <svg width={12} height={11} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 11V2M6 2L1 7M6 2L11 7" stroke="#868594" strokeWidth="1.6"/>
                    </svg>
                </button>
            </div>
        </aside>
        {
            isAddNewProjectModalMode && <CreateNewProjectModal hideBlock={handleCloseModal}/>
        }
    </>
}

type InvitationProjectsPropsType = {}

export type AcceptProjectUserType = { invitationId: number, name: string, hoursRate: number }

const InvitationProjects: React.FC<InvitationProjectsPropsType> = () => {
    const dispatch = useDispatch()
    const {request, loading} = useHttp()

    const [acceptProjectId, setAcceptProjectId] = React.useState<number | null>(null)
    const invitations = useSelector(getInvitations)
    const userId = useSelector(getUserId)

    const handleAcceptProject = async (data: AcceptProjectUserType) => {
        let response = await request(`users/${userId}/invitations/${data.invitationId}`, "post", {status: "ACCEPTED" as InviteStatusType})
        if (response) {
            dispatch(actionsProjects.acceptProject(data.invitationId))
        }
    }

    const handleDeclineProject = async (invitationId: number) => {
        let response = await request(`users/${userId}/invitations/${invitationId}`, "post", {status: "DECLINED" as InviteStatusType})
        if (response) {
            dispatch(actionsProjects.acceptProject(invitationId))
        }
    }

    return <>
        <ul className="sidebar__block block-sidebar block-sidebar__invitation">
            {
                invitations?.map((item, index) => {
                    return <li key={item.invitation_id || index} className="block-sidebar__item">
                        <button className="block-sidebar__btn block-sidebar-open">
                            <span/> {item.name}
                        </button>
                        <div className="block-sidebar__body">
                            <button disabled={loading} onClick={() => setAcceptProjectId(item.invitation_id)}
                                    className="block-sidebar__button block-sidebar__button--accept">Accept
                            </button>
                            <button disabled={loading} onClick={() => handleDeclineProject(item.invitation_id)}
                                    className="block-sidebar__button block-sidebar__button--decline">Decline
                            </button>
                        </div>
                    </li>
                })
            }
        </ul>
        {
            acceptProjectId &&
            <AcceptInvitationModal invitationId={acceptProjectId} handleAcceptProject={handleAcceptProject}
                                   hideBlock={() => setAcceptProjectId(null)}/>
        }
    </>
}

const Projects: React.FC<{ projects: ProjectType[] | null, handleAddNewProject: () => void }> = ({
                                                                                                     handleAddNewProject,
                                                                                                     projects
                                                                                                 }) => {
    return <ul className="sidebar__block block-sidebar">
        {
            projects?.map((item, index) => {
                return <Link key={item.project_id} href={"/projects/" + item.project_id}>
                    <li className="block-sidebar__item">
                        <button className="block-sidebar__btn">
                            <span/> {item.name}
                        </button>
                    </li>
                </Link>
            })
        }
        <li className="block-sidebar__item">
            <button onClick={handleAddNewProject} className="block-sidebar__btn-add">
                <span>+</span>Add new project
            </button>
        </li>
    </ul>
}