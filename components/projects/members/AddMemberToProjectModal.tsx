import React from 'react';
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {CopyInviteItems} from "../modals/TeamSettingsModal";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {ProfileAPI} from "../../../src/api/ProfileAPI";
import {actionsProfile} from "../../../src/redux/profile-reducer";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {useForm} from "react-hook-form";
import {Toast, useToast} from "../../common/blocks/Toast";
import {useHttp} from "../../../src/utils/hooks/http.hook";
import {UserType} from "../../../src/types/userTypes";
import {Btn2, Btn2Div} from "../../styled/buttons/Buttons";
import {IdBlockButton} from "../../styled/buttons/popup/PopupButtons";
import {
    IdBlockItem, IdBlockNumber, InputTag,
    PopupClose,
    PopupForm, PopupInputId, PopupItem,
    PopupTabs, PopupTabsBlock, PopupTabsBody, PopupTabsColumn,
    PopupTabsItem, PopupTabsLine,
    PopupTabsNav,
    PopupTitle
} from "../../styled/modals/components";
import {getToken} from "../../../src/redux/projects-selector";
import {ProjectAPI} from "../../../src/api/ProjectAPI";

type PropsType = {
    hideBlock: () => void
    projectId: number | null | undefined
}

export const AddMemberToProjectModal: React.FC<PropsType> = ({hideBlock, projectId}) => {

    const hookForm = useForm()
    const dispatch = useDispatch()
    const modalRef = React.useRef(null)
    const {show} = useToast()
    const [error, setError] = React.useState("")

    const contacts = useSelector((state: AppStateType) => state.profile.contacts)
    const token = useSelector(getToken)
    const [activeTabId, setActiveTabId] = React.useState<number>(1)

    const [tabs,] = React.useState<{ className?: string, title: string, Component: () => JSX.Element }[]>(
        [
            {
                title: "E-mail",
                Component: () => <InviteMemberViaEmail hookForm={hookForm}
                                                       hideBlock={hideBlock}/>
            },
            {
                title: "ID invitation",
                Component: () => <InviteMemberViaId projectId={projectId} hideBlock={hideBlock}/>,
                className: "input-id-button"
            },
            {
                title: "From contacts",
                Component: () => <InviteMemberFromContacts hookForm={hookForm} hideBlock={hideBlock}/>
            }
        ])

    React.useEffect(() => {
        !contacts && ProfileAPI.getContacts().then(res => {
            !res?.error && dispatch(actionsProfile.setContacts(res))
        }).catch(e => {
            console.log(e)
        })
    }, [contacts])

    const sendRequestUsers = async (data: any) => {
        projectId && ProjectAPI.sendInvitation(+projectId, data).then(response => {
            if (response) {
                response && dispatch(actionsProjects.addUsersToProject(response))
                hideBlock()
            }
        }).catch(e => {
            setError(e.message)
            console.log(e)
        })
    }
    const onSubmit = async (data: { email?: string }) => {
        let contactId = 0
        for (let key in data) {
            //@ts-ignore
            let splitId = data[key].split["_"]
            contactId = splitId && splitId[1]
        }
        if (data?.email) {
            await sendRequestUsers(data)
        } else if (contactId) {
            await sendRequestUsers({user_id: contactId.toString()})
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("null")
    }, [error])

    useOutsideAlerter(modalRef, hideBlock)

    return <CustomPopup className={"popup__invite"} modalBodyRef={modalRef}>
        <PopupClose onClick={hideBlock} />
        <PopupTitle className="popup__title">
            Invite with:
        </PopupTitle>

        <PopupForm onSubmit={hookForm.handleSubmit(onSubmit)} className="popup__form">
            <PopupTabs className="popup__tabs tabs-popup">
                <PopupTabsNav className="tabs-popup__nav">
                    {
                        tabs.map((tab, index) => {
                            return <PopupTabsItem key={index} onClick={() => setActiveTabId(index)}
                                        className={"tabs-popup__item" + (index === activeTabId ? " tabs-open" : "")}>{tab.title}</PopupTabsItem>
                        })
                    }
                </PopupTabsNav>
                <PopupTabsBody>
                    <PopupTabsBlock className="tabs-popup__block">
                        {
                            projectId && tabs.map((tab, index) => {
                                return <React.Fragment key={index}>
                                    {
                                        index === activeTabId && tab.Component()
                                    }
                                </React.Fragment>
                            })
                        }
                    </PopupTabsBlock>
                </PopupTabsBody>
            </PopupTabs>
            <CopyInviteItems/>
        </PopupForm>
        <Toast/>
    </CustomPopup>
}

const InviteMemberViaEmail: React.FC<ModalItemPropsType> = ({hookForm}) => {
    return <PopupTabsLine className="tabs-popup__line">
        <input required={true} ref={hookForm?.register} className="tabs-popup__input"
               placeholder="E-mail, comma separated" type="email"
               name="email"/>
        <Btn2 type={"submit"} className={"tabs-popup__btn"}>Send invite</Btn2>
    </PopupTabsLine>
}
const InviteMemberFromContacts: React.FC<ModalItemPropsType> = ({hookForm}) => {
    const contacts = useSelector((state: AppStateType) => state.profile.contacts)

    return <PopupTabsColumn className="tabs-popup__column">
        <ul className="tabs-popup__inner">
            {
                contacts?.map(c => {
                    return <li key={c.user_id} className="tabs-popup__box">
                        <label htmlFor={"radio-" + c.user_id} className="tabs-popup__label">
                            {c.first_name}
                            <input ref={hookForm?.register} required={true} type="radio" id={"radio-" + c.user_id}
                                   defaultChecked
                                   className="tabs-popup__radio" name={"contact_" + c.user_id}/>
                            <span className="tabs-popup__custom"/>
                        </label>
                    </li>
                })
            }
        </ul>
        <Btn2 disabled={!!contacts} type={"submit"} className={"tabs-popup__btn"}>Send invite</Btn2>
    </PopupTabsColumn>

}

const InviteMemberViaId: React.FC<InviteViaIdType> = ({hideBlock, projectId}) => {
    const {show} = useToast()
    const {clearError, request, error, loading} = useHttp()
    const [addedIds, setAddedIds] = React.useState([] as string[])

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }
    const onSubmit = async () => {
        const invitations = projectId && addedIds.map(userId => ({user_id: +userId, project_id: +projectId}))

        let response = invitations && await request<UserType[]>(`invitations`, "post", invitations)
        if (response) {
            // response && dispatch(actionsProjects.addUsersToProject(response))
            hideBlock()
        }
    }

    const onPressEnter = (e: any) => {
        if (e.code === "Enter") {
            //@ts-ignore
            let text = e.target.value
            let isExist = addedIds.some(item => item === text)
            if (isExist)
                return

            if (text.length > 0 && !isExist) {
                //@ts-ignore
                setAddedIds(state => ([...state, text]))
                //@ts-ignore
                e.target.value = ""
            }
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    const onClick = () => {
        if (!loading)
            addedIds && onSubmit()
    }

    return <PopupTabsLine className="tabs-popup__line">
        <PopupItem className="popup__item">
            <PopupInputId className="popup__input popup__input--id">
                {
                    addedIds.map((id, index) => {
                        return <IdBlockItem key={index}>
                            <IdBlockNumber>{id}</IdBlockNumber>
                            <IdBlockButton onClick={() => handleDeleteId(id)}>
                                <RemoveItemIcon/>
                            </IdBlockButton>
                        </IdBlockItem>
                    })
                }
                <InputTag name="ids" id="inpid" onKeyPress={onPressEnter} type="text"/>
            </PopupInputId>
        </PopupItem>
        <Btn2Div onClick={onClick} className={"tabs-popup__btn"}>Send invite</Btn2Div>
        <Toast/>
    </PopupTabsLine>

}

export const RemoveItemIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18}
                height={18} viewBox="0 0 18 18">
        <defs>
            <path id="avzva"
                  d="M691.485 160.07l-1.414 1.415-7.071-7.071-7.071 7.071-1.414-1.414 7.07-7.071-7.07-7.071 1.414-1.415 7.07 7.071 7.072-7.07 1.414 1.414-7.07 7.07z"/>
        </defs>
        <g>
            <g transform="translate(-674 -144)">
                <use fill="#fff" xlinkHref="#avzva"/>
            </g>
        </g>
    </svg>
}

interface ModalItemPropsType {
    loading?: boolean
    hideBlock: () => void
    hookForm?: { register: any, errors: any }
}

interface InviteViaIdType extends ModalItemPropsType {
    handleDeleteId?: (n: string) => void,
    addedIds?: string[]
    projectId: number | null | undefined
    setAddedIds?: (n: string[]) => void
}