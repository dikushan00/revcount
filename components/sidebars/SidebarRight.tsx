import React from 'react';
import {TeamProjectButton} from "../common/blocks/buttons/TeamProjectButton";
import {AddMemberToProjectModal} from "../projects/members/AddMemberToProjectModal";
import {TeamSettingsModal} from "../projects/modals/TeamSettingsModal";
import {useDispatch, useSelector} from "react-redux";
import {getActiveProject} from "../../src/redux/projects-selector";
import {actionsProjects} from "../../src/redux/projects-reducer";

export const SidebarRight = () => {

    const dispatch = useDispatch()
    const activeProject = useSelector(getActiveProject)

    const [isModalMode, setIsModalMode] = React.useState({
        inviteMember: false,
        teamSettings: false
    })

    const onEditClick = (editId: number | null) => {
        let activeEdit = activeProject?.revisions?.find(item => item.revision_id === editId) || null
        dispatch(actionsProjects.setActiveEdit(activeEdit))
    }

    return <>
        <div className="page__sidebar sidebar-page">
            <div className="sidebar-page__team-project team-project ">
                <div className="team-project__header">
                    <h4 className="team-project__label">
                        Project team
                    </h4>
                    <button className="team-project__settings"
                            onClick={() => setIsModalMode(state => ({...state, teamSettings: true}))}>
                        <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.5725 9.735C14.6025 9.495 14.625 9.255 14.625 9C14.625 8.745 14.6025 8.505 14.5725 8.265L16.155 7.0275C16.2975 6.915 16.335 6.7125 16.245 6.5475L14.745 3.9525C14.655 3.7875 14.4525 3.7275 14.2875 3.7875L12.42 4.5375C12.03 4.2375 11.61 3.99 11.1525 3.8025L10.8675 1.815C10.845 1.635 10.6875 1.5 10.5 1.5H7.5C7.3125 1.5 7.155 1.635 7.1325 1.815L6.8475 3.8025C6.39 3.99 5.97 4.245 5.58 4.5375L3.7125 3.7875C3.54 3.72 3.345 3.7875 3.255 3.9525L1.755 6.5475C1.6575 6.7125 1.7025 6.915 1.845 7.0275L3.4275 8.265C3.3975 8.505 3.375 8.7525 3.375 9C3.375 9.2475 3.3975 9.495 3.4275 9.735L1.845 10.9725C1.7025 11.085 1.665 11.2875 1.755 11.4525L3.255 14.0475C3.345 14.2125 3.5475 14.2725 3.7125 14.2125L5.58 13.4625C5.97 13.7625 6.39 14.01 6.8475 14.1975L7.1325 16.185C7.155 16.365 7.3125 16.5 7.5 16.5H10.5C10.6875 16.5 10.845 16.365 10.8675 16.185L11.1525 14.1975C11.61 14.01 12.03 13.755 12.42 13.4625L14.2875 14.2125C14.46 14.28 14.655 14.2125 14.745 14.0475L16.245 11.4525C16.335 11.2875 16.2975 11.085 16.155 10.9725L14.5725 9.735ZM9 11.625C7.5525 11.625 6.375 10.4475 6.375 9C6.375 7.5525 7.5525 6.375 9 6.375C10.4475 6.375 11.625 7.5525 11.625 9C11.625 10.4475 10.4475 11.625 9 11.625Z"
                                fill="#868594"/>
                        </svg>
                    </button>
                </div>
                <TeamProjectButton onClick={() => setIsModalMode(state => ({...state, inviteMember: true}))}>Add
                    member<span>+</span></TeamProjectButton>
                <ul className="team-project__list">
                    {
                        activeProject?.users?.map(user => {
                            return <li key={user.user_id} className="team-project__item">
                                <div className="team-project__name">
                                    <span/>{user.name} {user.isOwner && "(You)"}
                                </div>
                                <div className="team-project__role">
                                    {user.role.name}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="sidebar-page__actions notices">
                <h4 className="notices__label">
                    Actions and notices
                </h4>
                <ul className="notices__list">
                    {
                        activeProject?.actionsHistory?.map(action => {
                            return <li key={action.id} className="notices__item">
                                <div className="notices__text">
                                    {action.action} <span onClick={() => onEditClick(action?.edit?.revision_id || null)} className="notices__text-span">«{action.edit.name}»</span>
                                    {action.offer && <>
                                        <span className="notices__span notices__span--1">{action.offer.balance}$</span>
                                        <span className="notices__span notices__span--2">{action.offer.days}d.</span>
                                        <span className="notices__span notices__span--3">{action.offer.hours}h.</span>
                                    </>}
                                </div>
                                <div className="notices__time">
                                    {action.time}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
        {
            isModalMode.inviteMember &&
            <AddMemberToProjectModal hideBlock={() => setIsModalMode(state => ({...state, inviteMember: false}))}/>
        }
        {
            isModalMode.teamSettings &&
            <TeamSettingsModal users={activeProject?.users} hideBlock={() => setIsModalMode(state => ({...state, teamSettings: false}))}/>
        }
    </>
}
