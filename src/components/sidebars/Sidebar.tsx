import React from "react"
import logoImg from "../../assets/img/icons/logo.svg"
import {Link} from "react-router-dom"
import {CreateNewProjectModal} from "../projects/addProject/CreateNewProjectModal";

export const Sidebar = () => {

    const [isAddNewProjectModalMode, setIsAddNewProjectModalMode] = React.useState(false)

    const handleAddNewProject = () => {
        setIsAddNewProjectModalMode(true)
    }
    const handleCloseModal = () => {
        setIsAddNewProjectModalMode(false)
    }
    return <>
        <aside className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <Link className="sidebar__logo-link" to="/">
                        <picture>
                            <source srcSet={logoImg} type="image/webp"/>
                            <img src={logoImg} alt="logo"/></picture>
                    </Link>
                </div>
            </div>
            <div className="sidebar__content">
                <div className="sidebar__actions">
                    <button className="sidebar__btn sidebar__btn--1 btn-3">Projects</button>
                    <button className="sidebar__btn sidebar__btn--2 btn-3">Invitations<span
                        className="sidebar__span">2</span></button>
                </div>
                <ul className="sidebar__block block-sidebar">
                    <li className="block-sidebar__item">
                        <button className="block-sidebar__btn">
                            <span/>Otava Chemical
                        </button>
                    </li>
                    <li className="block-sidebar__item">
                        <button onClick={handleAddNewProject} className="block-sidebar__btn-add">
                            <span>+</span>Add new project
                        </button>
                    </li>
                </ul>
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
            isAddNewProjectModalMode && <CreateNewProjectModal hideBlock={handleCloseModal} />
        }
    </>
}