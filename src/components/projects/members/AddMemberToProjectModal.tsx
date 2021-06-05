import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from "../../../utils/hooks/outsideClick";

type PropsType = {
    hideBlock: () => void
}
export const AddMemberToProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const [activeTabId, setActiveTabId] = React.useState<number>(1)

    const modalRef = React.useRef(null)

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
                        tabs.map(tab => {
                            return <div onClick={() => setActiveTabId(tab.id)}
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

            <ul className="popup__actions actions-popup">
                <li className="actions-popup__item">
                    <a href="#" className="actions-popup__link">
                        Copy invite link
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path
                                    d="M2.66675 4.5C2.66675 2.754 4.08741 1.33333 5.83342 1.33333H11.9221C11.7027 0.566 11.0034 0 10.1667 0H2.50008C1.48875 0 0.666748 0.822 0.666748 1.83333V12.1667C0.666748 13.178 1.48875 14 2.50008 14H2.66675V4.5Z"
                                    fill="#868594"/>
                                <path
                                    d="M13.5 2.66675H5.83333C4.822 2.66675 4 3.48875 4 4.50008V14.1667C4 15.1781 4.822 16.0001 5.83333 16.0001H13.5C14.5113 16.0001 15.3333 15.1781 15.3333 14.1667V4.50008C15.3333 3.48875 14.5113 2.66675 13.5 2.66675ZM12.1667 14.0001H7.16667C6.89067 14.0001 6.66667 13.7761 6.66667 13.5001C6.66667 13.2241 6.89067 13.0001 7.16667 13.0001H12.1667C12.4427 13.0001 12.6667 13.2241 12.6667 13.5001C12.6667 13.7761 12.4427 14.0001 12.1667 14.0001ZM12.1667 11.3334H7.16667C6.89067 11.3334 6.66667 11.1094 6.66667 10.8334C6.66667 10.5574 6.89067 10.3334 7.16667 10.3334H12.1667C12.4427 10.3334 12.6667 10.5574 12.6667 10.8334C12.6667 11.1094 12.4427 11.3334 12.1667 11.3334ZM12.1667 9.00008H7.16667C6.89067 9.00008 6.66667 8.77608 6.66667 8.50008C6.66667 8.22408 6.89067 8.00008 7.16667 8.00008H12.1667C12.4427 8.00008 12.6667 8.22408 12.6667 8.50008C12.6667 8.77608 12.4427 9.00008 12.1667 9.00008ZM12.1667 6.33341H7.16667C6.89067 6.33341 6.66667 6.10941 6.66667 5.83341C6.66667 5.55741 6.89067 5.33341 7.16667 5.33341H12.1667C12.4427 5.33341 12.6667 5.55741 12.6667 5.83341C12.6667 6.10941 12.4427 6.33341 12.1667 6.33341Z"
                                    fill="#868594"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width={16} height={16} fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </li>
                <li className="actions-popup__item">
                    <a href="#" className="actions-popup__link">
                        Unique ID - 888BA0
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path
                                    d="M2.66675 4.5C2.66675 2.754 4.08741 1.33333 5.83342 1.33333H11.9221C11.7027 0.566 11.0034 0 10.1667 0H2.50008C1.48875 0 0.666748 0.822 0.666748 1.83333V12.1667C0.666748 13.178 1.48875 14 2.50008 14H2.66675V4.5Z"
                                    fill="#868594"/>
                                <path
                                    d="M13.5 2.66675H5.83333C4.822 2.66675 4 3.48875 4 4.50008V14.1667C4 15.1781 4.822 16.0001 5.83333 16.0001H13.5C14.5113 16.0001 15.3333 15.1781 15.3333 14.1667V4.50008C15.3333 3.48875 14.5113 2.66675 13.5 2.66675ZM12.1667 14.0001H7.16667C6.89067 14.0001 6.66667 13.7761 6.66667 13.5001C6.66667 13.2241 6.89067 13.0001 7.16667 13.0001H12.1667C12.4427 13.0001 12.6667 13.2241 12.6667 13.5001C12.6667 13.7761 12.4427 14.0001 12.1667 14.0001ZM12.1667 11.3334H7.16667C6.89067 11.3334 6.66667 11.1094 6.66667 10.8334C6.66667 10.5574 6.89067 10.3334 7.16667 10.3334H12.1667C12.4427 10.3334 12.6667 10.5574 12.6667 10.8334C12.6667 11.1094 12.4427 11.3334 12.1667 11.3334ZM12.1667 9.00008H7.16667C6.89067 9.00008 6.66667 8.77608 6.66667 8.50008C6.66667 8.22408 6.89067 8.00008 7.16667 8.00008H12.1667C12.4427 8.00008 12.6667 8.22408 12.6667 8.50008C12.6667 8.77608 12.4427 9.00008 12.1667 9.00008ZM12.1667 6.33341H7.16667C6.89067 6.33341 6.66667 6.10941 6.66667 5.83341C6.66667 5.55741 6.89067 5.33341 7.16667 5.33341H12.1667C12.4427 5.33341 12.6667 5.55741 12.6667 5.83341C12.6667 6.10941 12.4427 6.33341 12.1667 6.33341Z"
                                    fill="#868594"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width={16} height={16} fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </li>
            </ul>
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
    return <div className="tabs-popup__column">
        <ul className="tabs-popup__inner">
            <li className="tabs-popup__box">
                <label htmlFor="radio-1" className="tabs-popup__label">
                    Samuel Finnes
                    <input type="radio" name="radio" id="radio-1" defaultChecked className="tabs-popup__radio"/>
                    <span className="tabs-popup__custom"/>
                </label>
            </li>
            <li className="tabs-popup__box">
                <label htmlFor="radio-2" className="tabs-popup__label">
                    Sophie Archduchess
                    <input type="radio" name="radio" id="radio-2" className="tabs-popup__radio"/>
                    <span className="tabs-popup__custom"/>
                </label>
            </li>
            <li className="tabs-popup__box">
                <label htmlFor="radio-3" className="tabs-popup__label">
                    Denzen Forman
                    <input type="radio" name="radio" id="radio-3" className="tabs-popup__radio"/>
                    <span className="tabs-popup__custom"/>
                </label>
            </li>
            <li className="tabs-popup__box">
                <label htmlFor="radio-4" className="tabs-popup__label">
                    Silva Liberman
                    <input type="radio" name="radio" id="radio-4" className="tabs-popup__radio"/>
                    <span className="tabs-popup__custom"/>
                </label>
            </li>
        </ul>
        <button type="submit" className="tabs-popup__btn btn-2">Send invite</button>
    </div>

}
const InviteMemberViaId = () => {
    return <div className="tabs-popup__line">
        <div className="popup__item">
            <label htmlFor="inpid" className="id-block">
                <div className="id-block__item">
                    <div className="id-block__numer">888BA02</div>
                    <button className="id-block__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18}
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
                    </button>
                </div>
                <div className="id-block__item">
                    <div className="id-block__numer">111742</div>
                    <button className="id-block__btn">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18}
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
                    </button>
                </div>
            </label>
            <input id="inpid" type="text" className="popup__input popup__input--id"/>
        </div>
        <button type="submit" className="tabs-popup__btn btn-2">Send invite</button>
    </div>

}


const tabs = [
    {
        id: 1,
        title: "E-mail",
        Component: (key: number) => <InviteMemberViaEmail key = {key} />
    },
    {
        id: 2,
        title: "ID invitation",
        Component: (key: number) => <InviteMemberViaId key = {key} />
    },
    {
        id: 3,
        title: "From contacts",
        Component: (key: number) => <InviteMemberFromContacts key = {key} />
    },
] as { id: number, title: string, Component: (key: number) => JSX.Element }[]