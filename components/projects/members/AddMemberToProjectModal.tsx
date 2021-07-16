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
import {Btn2} from "../../styled/buttons/Buttons";
import {
    PopupClose,
    PopupForm,
    PopupTabs,
    PopupTabsBlock,
    PopupTabsBody,
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
    const [activeTabId, setActiveTabId] = React.useState<number>(0)

    const tabs = [
        {
            title: "E-mail",
            Component: () => <InviteMemberViaEmail hookForm={hookForm}
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
                hideBlock()
            }
        }).catch(e => {
            setError(e.response.data.message)
            console.log(e)
        })
    }

    const onSubmit = async (data: { email: string }) => {
        let postData = projectId && [{username: data.email, project_id: projectId}]
        if (data?.email) {
            postData && await sendRequestUsers(postData)
        }
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
    return <>
        <PopupTabsLine className="tabs-popup__line">
            <Controller as={<input className="tabs-popup__input" placeholder="E-mail, comma separated"/>}
                        name={`email`}
                        rules={{required: true, pattern: /.+@.+\..+/i}}
                        control={hookForm?.control}
                        defaultValue={""}
            />
            <Btn2 type={"submit"} className={"tabs-popup__btn"}>Send invite</Btn2>
        </PopupTabsLine>
        {hookForm?.errors[`email`] && <ValidationError>This field is required or check your email</ValidationError>}
    </>
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