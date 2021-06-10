import React from 'react';
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {CopyInviteItems} from "../modals/TeamSettingsModal";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {ProfileAPI} from "../../../src/api/ProfileAPI";
import {actionsProfile} from "../../../src/redux/profile-reducer";

type PropsType = {
    hideBlock: () => void
}
export const AddMemberToProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const contacts = useSelector((state: AppStateType) => state.profile.contacts)
    const [activeTabId, setActiveTabId] = React.useState<number>(1)

    const dispatch = useDispatch()
    const modalRef = React.useRef(null)

    React.useEffect(() => {
        !contacts && ProfileAPI.getContacts().then(res => {
            !res?.error && dispatch(actionsProfile.setContacts(res))
        })
    }, [contacts])


    useOutsideAlerter(modalRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    return <CustomPopup className={"popup__invite"} modalBodyRef={modalRef}>

        <div onClick={handleCloseModal} className="popup__close"/>
        <h2 className="popup__title">
            Invite with:
        </h2>

        <form action="#" className="popup__form">
            <div className="popup__tabs tabs-popup">
                <nav className="tabs-popup__nav">
                    {
                        tabs.map((tab, index) => {
                            return <div key={index} onClick={() => setActiveTabId(tab.id)}
                                        className={"tabs-popup__item" + (tab.id === activeTabId ? " tabs-open" : "")}>{tab.title}</div>
                        })
                    }
                </nav>
                <div className="tabs-popup__body">
                    <div className="tabs-popup__block">
                        {
                            tabs.map(tab => {
                                return tab.id === activeTabId && tab.Component(tab.id)
                            })
                        }
                    </div>
                </div>
            </div>

            <CopyInviteItems/>
        </form>
    </CustomPopup>
}

const InviteMemberViaEmail = () => {
    return <div className="tabs-popup__line">
        <input className="tabs-popup__input" placeholder="E-mail, comma separated" type="email" name="email"/>
        <button type="submit" className="tabs-popup__btn btn-2">Send invite</button>
    </div>
}
const InviteMemberFromContacts = () => {
    const contacts = useSelector((state: AppStateType) => state.profile.contacts)

    return <div className="tabs-popup__column">
        <ul className="tabs-popup__inner">
            {
                contacts?.map(c => {
                    return <li key={c.id} className="tabs-popup__box">
                        <label htmlFor={"radio-" + c.id} className="tabs-popup__label">
                            {c.name}
                            <input type="radio" name="radio" id={"radio-" + c.id} defaultChecked
                                   className="tabs-popup__radio"/>
                            <span className="tabs-popup__custom"/>
                        </label>
                    </li>
                })
            }
        </ul>
        <button type="submit" className="tabs-popup__btn btn-2">Send invite</button>
    </div>

}
const InviteMemberViaId = () => {

    const [addedIds, setAddedIds] = React.useState([] as string[])

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }

    const onSubmit = () => {}

    return <div className="tabs-popup__line">
        <div className="popup__item">
            <div className="popup__input popup__input--id">
                {
                    addedIds.map(id => {
                        return <div key={id} className="id-block__item">
                            <div className="id-block__number">{id}</div>
                            <span onClick={() => handleDeleteId(id)} className="id-block__btn">
                                <RemoveItemIcon/>
                            </span>
                        </div>
                    })
                }
                <input id="inpid" onKeyPress={e => {
                    if (e.code === "Enter") {
                        //@ts-ignore
                        let text = e.target.value
                        let isExist = addedIds.some(item => item === text)
                        if (isExist)
                            return

                        if (text.length > 0 && !isExist) {
                            setAddedIds(state => ([...state, text]))
                            //@ts-ignore
                            e.target.value = ""
                        }
                    }
                }} type="text" className="input_tag"/>
            </div>
        </div>
        <div onClick={onSubmit} className="tabs-popup__btn btn-2 input-id-button">Send invite</div>
    </div>

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

const tabs = [
    {
        id: 1,
        title: "E-mail",
        Component: (key: number) => <InviteMemberViaEmail key={key}/>
    },
    {
        id: 2,
        title: "ID invitation",
        Component: (key: number) => <InviteMemberViaId key={key}/>
    },
    {
        id: 3,
        title: "From contacts",
        Component: (key: number) => <InviteMemberFromContacts key={key}/>
    },
] as { id: number, title: string, Component: (key: number) => JSX.Element }[]