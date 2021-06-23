import React from "react"
import Link from 'next/link'
import {CreateNewProjectModal} from "../projects/addProject/CreateNewProjectModal";
import {ProjectType} from "../../src/types/projectTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../src/redux/store-redux";
import {actionsProjects} from "../../src/redux/projects-reducer";
import {AcceptInvitationModal} from "../projects/modals/AcceptInvitationModal";
import {getInvitations, getUserId} from "../../src/redux/projects-selector";
import {
    SideBarAcceptButton,
    SideBarBlockAddButton,
    SideBarBlockButton,
    SideBarButton,
    SideBarDeclineButton,
    SideBarFooterButton
} from "../styled/buttons/Buttons";
import {
    SidebarActions,
    SidebarAside,
    SidebarBlockInvitation,
    SidebarBlockItem,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarLogo,
    SidebarLogoLink
} from "../styled/sidebar/components";
import {ProjectAPI} from "../../src/api/ProjectAPI";

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
        <SidebarAside>
            <SidebarHeader>
                <SidebarLogo>
                    <Link href="/">
                        <SidebarLogoLink>
                            <picture>
                                <source srcSet={"/img/icons/logo.svg"} type="image/webp"/>
                                <img src={"/img/icons/logo.svg"} alt="logo"/>
                            </picture>
                        </SidebarLogoLink>
                    </Link>
                </SidebarLogo>
            </SidebarHeader>
            <SidebarContent>
                <SidebarActions>
                    <SideBarButton onClick={() => handleChangeAction("projects")}
                            className={" " + (activeAction === "projects" ? "active" : "")}>Projects
                    </SideBarButton>
                    <SideBarButton onClick={() => handleChangeAction("invitations")}
                            className={" " + (activeAction === "invitations" ? "active" : "")}>
                        Invitations
                        {invitations && invitations?.filter(item => item.status === "PENDING").length > 0 &&
                        <span className="sidebar__span">{invitations?.filter(item => item.status === "PENDING").length || ""}</span>}
                    </SideBarButton>
                </SidebarActions>
                {
                    activeAction === "projects" &&
                    <Projects projects={projects} handleAddNewProject={handleAddNewProject}/>
                }
                {
                    activeAction === "invitations" && <InvitationProjects/>
                }
            </SidebarContent>
            <SidebarFooter>
                <SideBarFooterButton>
                    Upgrade to premium
                    <svg width={12} height={11} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 11V2M6 2L1 7M6 2L11 7" stroke="#868594" strokeWidth="1.6"/>
                    </svg>
                </SideBarFooterButton>
            </SidebarFooter>
        </SidebarAside>
        {
            isAddNewProjectModalMode && <CreateNewProjectModal hideBlock={handleCloseModal}/>
        }
    </>
}

type InvitationProjectsPropsType = {}

export type AcceptProjectUserType = { invitationId: number, name: string, hoursRate: number }

const InvitationProjects: React.FC<InvitationProjectsPropsType> = () => {
    const dispatch = useDispatch()

    const [acceptProjectId, setAcceptProjectId] = React.useState<number | null>(null)
    const invitations = useSelector(getInvitations)
    const userId = useSelector(getUserId)

    const handleAcceptProject = async (data: AcceptProjectUserType) => {
        userId && ProjectAPI.acceptProject(+userId, +data.invitationId).then(response => {
            if (response) {
                setAcceptProjectId(null)
                dispatch(actionsProjects.acceptProject(data.invitationId))
            }
        }).catch(e => {
            console.log(e)
        })

    }

    const handleDeclineProject = async (invitationId: number) => {
        userId && ProjectAPI.declineProject(+userId, +invitationId).then(response => {
            if (response) {
                setAcceptProjectId(null)
                dispatch(actionsProjects.declineProject(invitationId))
            }
        }).catch(e => {
            console.log(e)
        })
    }

    return <>
        <SidebarBlockInvitation className="sidebar__block block-sidebar block-sidebar__invitation">
            {
                invitations?.map((item, index) => {
                    return item.status === "PENDING" && <SidebarBlockItem key={item.invitation_id || index} className="block-sidebar__item">
                        <SideBarBlockButton className="block-sidebar-open">
                            <span/> {item.project_name}
                        </SideBarBlockButton>
                        <div className="block-sidebar__body">
                            <SideBarAcceptButton onClick={() => setAcceptProjectId(item.invitation_id)}>Accept
                            </SideBarAcceptButton>
                            <SideBarDeclineButton onClick={() => handleDeclineProject(item.invitation_id)}>Decline
                            </SideBarDeclineButton>
                        </div>
                    </SidebarBlockItem>
                })
            }
        </SidebarBlockInvitation>
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
    const activeProject = useSelector((state: AppStateType) => state.projects.activeProject)
    return <ul className="sidebar__block block-sidebar">
        {
            projects?.map((item, index) => {
                return <Link key={item.project_id} href={"/projects/" + item.project_id}>
                    <SidebarBlockItem className="block-sidebar__item">
                        {/*@ts-ignore*/}
                        <SideBarBlockButton isActive = {activeProject?.project_id === item.project_id}>
                            <span/> {item.name}
                        </SideBarBlockButton>
                    </SidebarBlockItem>
                </Link>
            })
        }
        <SidebarBlockItem className="block-sidebar__item">
            <SideBarBlockAddButton onClick={handleAddNewProject} className="block-sidebar__btn-add">
                <span>+</span>Add new project
            </SideBarBlockAddButton>
        </SidebarBlockItem>
    </ul>
}