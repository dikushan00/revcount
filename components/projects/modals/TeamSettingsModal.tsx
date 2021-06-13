import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {UserType} from "../../../src/types/userTypes";
import {CopyTextClipboardIcon, DefaultProfileAvatar} from "../../header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {copyTextToClipboard} from "../../../src/utils/copyToClipboard";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {actionsProjects} from "../../../src/redux/projects-reducer";

type PropsType = {
    hideBlock: () => void
    users: UserType[] | undefined | null
}
export const TeamSettingsModal: React.FC<PropsType> = ({hideBlock, users}) => {
    const dispatch = useDispatch()
    const project = useSelector((state: AppStateType) => state.projects.activeProject)
    const changeUsersRole = (userId: number, roleId: number) => {
        let role = userRoleSelections.find(item => item.id === roleId)
        let projectUsers = project?.users.map(item => {
            if (item.id === userId)
                return {...item, role}
            return item
        })
        let projectPost = {...project, users: projectUsers}
        //@ts-ignore
        project && ProjectAPI.editProject(project.id, projectPost).then(res => {
            !res?.error && dispatch(actionsProjects.setActiveProject(res))
        })
    }
    return <CustomPopup className={"popup__team"}>
        <div>
            <div className="popup__close" onClick={hideBlock}/>
            <h2 className="popup__title">
                Team setting
            </h2>
            <form action="#" className="popup__form">
                {
                    users?.map(user => {
                        return <div key={user.id} className="popup__line">
                            <label className="popup__user">
                                <div className="popup__user-icon">
                                    {user?.avatar
                                        ? user.avatar
                                        : <DefaultProfileAvatar/>
                                    }
                                </div>
                                <div className="popup__name">
                                    {user.name} {user.isOwner && "(You)"}
                                </div>
                            </label>
                            <div className="popup__profession">
                                {/*{user.isOwner ? "Owner" : "Artist"}*/}
                                <div className="popup__profession">
                                    <select onChange={(e) => {
                                        let roleId = e.currentTarget.value
                                        changeUsersRole(user.id, +roleId)
                                    }} defaultValue={user.role.id} id="popup-select-1" className="popup__select">
                                        {userRoleSelections.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    })
                }
                <CopyInviteItems/>
            </form>
        </div>
    </CustomPopup>
}

export const CopyInviteItems = () => {


    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const [isCopied, setIsCopied] = React.useState({
        inviteLink: false,
        id: false
    })

    const copyInviteLinkText = (text: string | number) => {
        copyTextToClipboard(text.toString(), setIsInviteLinkCopied)
    }
    const copyIdText = (text: string | number) => {
        copyTextToClipboard(text.toString(), setIsIdCopied)
    }
    const setIsInviteLinkCopied = (n: boolean) => {
        setIsCopied(state => ({...state, inviteLink: n}))
    }
    const setIsIdCopied = (n: boolean) => {
        setIsCopied(state => ({...state, id: n}))
    }
    return <ul className="popup__actions actions-popup">
        <li onMouseLeave={() => setIsInviteLinkCopied(false)} className="actions-popup__item tooltip"
            onClick={() => copyInviteLinkText("http://localhost:3000/")}>
                        <span className="actions-popup__link">
                            Copy invite link
                            <CopyTextClipboardIcon/>
                        </span>
            <span className={"tooltiptext"}>
                            {isCopied.inviteLink ? "Copied!" : "Copy"}
                        </span>
        </li>
        <li onMouseLeave={() => setIsIdCopied(false)}
            className="actions-popup__item tooltip"
            onClick={() => profile?.inviteId && copyIdText(profile?.inviteId)}>
                        <span className="actions-popup__link">
                            Unique ID - {profile?.inviteId}
                            <CopyTextClipboardIcon/>
                        </span>
            <span className={"tooltiptext"}>
                            {isCopied.id ? "Copied!" : "Copy"}
                        </span>
        </li>
    </ul>
}

const userRoleSelections = [
    {
        id: 1,
        name: "Owner"
    },
    {
        id: 2,
        name: "Artist"
    },
    {
        id: 3,
        name: "Manager"
    }
]