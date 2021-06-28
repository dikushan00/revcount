import React from 'react';
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {CopyInviteItems} from "../modals/TeamSettingsModal";
import {useDispatch} from "react-redux";
import {ProfileAPI} from "../../../src/api/ProfileAPI";
import {actionsProfile} from "../../../src/redux/profile-reducer";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {Controller, useForm} from "react-hook-form";
import {Toast, useToast} from "../../common/blocks/Toast";
import {Btn2, Btn2Div} from "../../styled/buttons/Buttons";
import {IdBlockButton} from "../../styled/buttons/popup/PopupButtons";
import {
    IdBlockItem,
    IdBlockNumber,
    InputTag,
    PopupClose,
    PopupForm,
    PopupInputId,
    PopupItem,
    PopupTabs,
    PopupTabsBlock,
    PopupTabsBody,
    PopupTabsColumn,
    PopupTabsItem,
    PopupTabsLine,
    PopupTabsNav,
    PopupTitle
} from "../../styled/modals/components";
import {ContactPostType, ProjectAPI} from "../../../src/api/ProjectAPI";
import {ValidationError} from "../../common/form/ValidationError";

type PropsType = {
    hideBlock: () => void
    projectId: number | null | undefined
}
type ContactType = { user_id: number, name: string, first_name: string, checked: boolean }
// { className?: string, title: string, Component: () => JSX.Element }[]
export const AddMemberToProjectModal: React.FC<PropsType> = ({hideBlock, projectId}) => {

    const hookForm = useForm()
    const dispatch = useDispatch()
    const modalRef = React.useRef(null)
    const {show} = useToast()
    const [error, setError] = React.useState("")

    const [contacts, setContacts] = React.useState<ContactType[]>([
        {
            user_id: 646,
            name: "Samuel Finnes",
            first_name: "Samuel Finnes",
            checked: true
        },
        {
            user_id: 546,
            name: "Sophie Archduches",
            first_name: "Sophie Archduches",
            checked: false
        },
        {
            user_id: 446,
            name: "Denzel Forman",
            first_name: "Denzel Forman",
            checked: false
        }
    ])

    // const contacts = useSelector((state: AppStateType) => state.profile.contacts)
    const [activeTabId, setActiveTabId] = React.useState<number>(1)

    const tabs = [
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
            Component: () => <InviteMemberFromContacts contacts={contacts} onClickRadio={onClickRadio}
                                                       hookForm={hookForm}
                                                       hideBlock={hideBlock}/>
        }
    ]

    React.useEffect(() => {
        !contacts && ProfileAPI.getContacts().then(res => {
            !res?.error && dispatch(actionsProfile.setContacts(res))
        }).catch(e => {
            console.log(e)
        })
    }, [contacts])

    const sendRequestUsers = async (data: ContactPostType[]) => {
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
    const onClickRadio = (id: number) => {
        let edited = contacts.map(item => {
            if (item.user_id === +id)
                return {...item, checked: !item.checked}
            return {...item}
        })
        edited && setContacts(edited)
    }

    const onSubmit = async (data: { email?: string }) => {

        const contactsPostData: ContactPostType[] = []
        contacts.forEach(item => {
            if (item.checked && projectId)
                contactsPostData.push({user_id: item.user_id, project_id: projectId})
        })
        if (data?.email) {
            //@ts-ignore
            await sendRequestUsers(data)
        } else if (contactsPostData.length) {
            await sendRequestUsers(contactsPostData)
        }
        debugger
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("")
    }, [error])

    useOutsideAlerter(modalRef, hideBlock)

    return <CustomPopup className={"popup__invite"} modalBodyRef={modalRef}>
        <PopupClose onClick={hideBlock}/>
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
        <Controller as={<input className="tabs-popup__input" placeholder="E-mail, comma separated"/>}
                    name={`email`}
                    rules={{required: true, pattern: /.+@.+\..+/i}}
                    control={hookForm?.control}
                    defaultValue={""}
        />
        {hookForm?.errors[`email`] && <ValidationError>This field is required or check your email</ValidationError>}
        <Btn2 type={"submit"} className={"tabs-popup__btn"}>Send invite</Btn2>
    </PopupTabsLine>
}
const InviteMemberFromContacts: React.FC<ModalItemPropsType> = ({hookForm, contacts, onClickRadio}) => {
    // const contacts = useSelector((state: AppStateType) => state.profile.contacts)
    const [isOneItemChecked, setIsOneItemChecked] = React.useState(true)
    React.useEffect(() => {
        let isChecked = contacts?.some(item => item.checked)
        setIsOneItemChecked(!!isChecked)
    }, [contacts])

    return <PopupTabsColumn className="tabs-popup__column">
        <ul className="tabs-popup__inner">
            {
                contacts?.map((c) => {
                    return <li key={c.user_id} className="tabs-popup__box">
                        <label htmlFor={"radio-" + c.user_id} className="tabs-popup__label">
                            {c.first_name}
                            <Controller
                                as={<input value={c.user_id} defaultValue={c.user_id} checked={c.checked} type="radio"
                                           id={`contact_${c.user_id}`} className="tabs-popup__radio"/>}
                                name={`contact_${c.user_id}`}
                                // rules={{required: true}}
                                control={hookForm?.control}
                                defaultValue={c.user_id}
                            />
                            <span onClick={() => onClickRadio && onClickRadio(c.user_id)}
                                  className="tabs-popup__custom"/>
                        </label>
                    </li>
                    {
                        hookForm?.errors[`contact_${c.user_id}`] && <ValidationError/>
                    }
                })
            }
        </ul>
        <Btn2 disabled={!contacts || !isOneItemChecked} type={"submit"} className={"tabs-popup__btn"}>Send invite</Btn2>
    </PopupTabsColumn>

}

const InviteMemberViaId: React.FC<InviteViaIdType> = ({hideBlock, projectId}) => {
    const {show} = useToast()
    const dispatch = useDispatch()
    const [addedIds, setAddedIds] = React.useState([] as string[])
    const [error, setError] = React.useState("")

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }
    const onSubmit = async () => {
        const invitations = projectId && addedIds.map(userId => ({user_id: +userId, project_id: +projectId}))

        invitations && invitations.length && ProjectAPI.addMemberToProjectViaId(invitations).then(response => {
            dispatch(actionsProjects.addUserToProject(response))
            hideBlock()
        }).catch(res => {
            let errorMessage = res.response.data.message
            setError(errorMessage)
        })
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
        return () => setError("")
    }, [error])

    const onClick = () => {
        // if (!loading)
        addedIds.length && onSubmit()
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("")
    }, [error])

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
    hookForm?: { register: any, errors: any, control: any }
    contacts?: ContactType[]
    onClickRadio?: (n: number) => void
}

interface InviteViaIdType extends ModalItemPropsType {
    handleDeleteId?: (n: string) => void,
    addedIds?: string[]
    projectId: number | null | undefined
    setAddedIds?: (n: string[]) => void
}