import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {UserType} from "../../../src/types/userTypes";
import {CopyTextClipboardIcon, DefaultProfileAvatar} from "../../header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {copyTextToClipboard} from "../../../src/utils/copyToClipboard";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {Toast, useToast} from "../../common/blocks/Toast";
import {
    PopupActions,
    PopupActionsItem,
    PopupActionsLink,
    PopupClose,
    PopupForm,
    PopupProfession,
    PopupSelect,
    PopupTabsLine,
    PopupTitle
} from "../../styled/modals/components";
import {ProjectAPI} from "../../../src/api/ProjectAPI";

type PropsType = {
    hideBlock: () => void
    users: UserType[] | undefined | null
}
export const TeamSettingsModal: React.FC<PropsType> = ({hideBlock, users}) => {
    const dispatch = useDispatch()
    const {show} = useToast()

    const projectId = useSelector((state: AppStateType) => state.projects.activeProject?.project_id)
    const [error, setError] = React.useState("")

    const changeUsersRole = async (userId: number, roleId: number) => {
        let role = userRoleSelections.find(item => item.id === roleId)

        projectId && role && ProjectAPI.changeProjectUsersRole(+projectId, {role: role.name}).then(response => {
            if (response) {
                dispatch(actionsProjects.setActiveProject(response))
                hideBlock()
            }
        }).catch(e => {
            setError(e.message)
        })
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("")
    }, [error])

    return <CustomPopup className={"popup__team"}>
        <div>
            <PopupClose onClick={hideBlock}/>
            <PopupTitle className="popup__title">
                Team setting
            </PopupTitle>
            <PopupForm className="popup__form">
                {
                    users?.map(user => {
                        return <PopupTabsLine key={user.user_id} className="popup__line">
                            <label className="popup__user">
                                <div className="popup__user-icon">
                                    {user?.avatar
                                        ? user.avatar
                                        : <DefaultProfileAvatar/>
                                    }
                                </div>
                                <div className="popup__name">
                                    {user.first_name} {user.isOwner && "(You)"}
                                </div>
                            </label>
                            <PopupProfession className="popup__profession">
                                {/*{user.isOwner ? "Owner" : "Artist"}*/}
                                <PopupProfession className="popup__profession">
                                    <PopupSelect onChange={(e) => {
                                        let roleId = e.currentTarget.value
                                        changeUsersRole(user.user_id, +roleId)
                                    }} defaultValue={user?.role?.id || 2} id="popup-select-1" className="popup__select">
                                        {userRoleSelections.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </PopupSelect>
                                </PopupProfession>
                            </PopupProfession>
                        </PopupTabsLine>
                    })
                }
                <CopyInviteItems/>
            </PopupForm>
        </div>
        <Toast/>
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
    return <PopupActions>
        <PopupActionsItem onMouseLeave={() => setIsInviteLinkCopied(false)}
            className="tooltip"
            onClick={() => copyInviteLinkText("http://localhost:3000/")}>
                <PopupActionsLink className="actions-popup__link">
                    Copy invite link
                    <CopyTextClipboardIcon/>
                </PopupActionsLink>
                <span className={"tooltiptext"}>
                            {isCopied.inviteLink ? "Copied!" : "Copy"}
                </span>
        </PopupActionsItem>
        <PopupActionsItem onMouseLeave={() => setIsIdCopied(false)}
            className="tooltip"
            onClick={() => profile?.inviteId && copyIdText(profile?.inviteId)}>
                <PopupActionsLink className="actions-popup__link">
                    Unique ID - {profile?.inviteId}
                    <CopyTextClipboardIcon/>
                </PopupActionsLink>
                <span className={"tooltiptext"}>
                    {isCopied.id ? "Copied!" : "Copy"}
                </span>
        </PopupActionsItem>
    </PopupActions>
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
