import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {RemoveItemIcon} from "../members/AddMemberToProjectModal";
import {useDispatch, useSelector} from "react-redux";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {ProjectPostType} from "../../../src/types/projectTypes";
import {getUserId} from "../../../src/redux/projects-selector";

type PropsType = {
    hideBlock: () => void
}
export const CreateNewProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register, watch} = useForm()
    const addProjectRef = React.useRef(null)

    const [isInputDateMode, setIsInputDateMode] = React.useState(false)
    const [addedIds, setAddedIds] = React.useState([] as string[])

    const userId = useSelector(getUserId)

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }

    useOutsideAlerter(addProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    const onSubmit = (data: { name: string, freeEdits: string, deadline: string }) => {
        const invitations = addedIds.map(userId => ({user_id: userId}))
        let project = {
            name: data.name,
            freeEdits: +data.freeEdits,
            deadline: data.deadline,
            balance: 0,
            included_revisions: 0,
            invitations,
            revisions: [],
        } as ProjectPostType

        userId && ProjectAPI.createProject(userId, project).then(res => {
            dispatch(actionsProjects.addProject(res))
            hideBlock()
        })
    }

    return <CustomPopup className={"popup__create"} modalBodyRef={addProjectRef}>
        <div className="popup__close" onClick={handleCloseModal}/>
        <h2 className="popup__title">
            Create a new project
        </h2>
        <form className="popup__form">
            <div className="popup__item">
                <input ref={register} name="name" type="text" placeholder="Project name" className="popup__input"/>
            </div>
            <div className="popup__item">
                <input ref={register} name="freeEdits" type="text" placeholder="Free edits in hours"
                       className="popup__input"/>
            </div>
            <div className="popup__item">
                <label htmlFor="inpdate" className="popup__icon">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                            fill="#1078F1"/>
                    </svg>
                </label>
                <input ref={register} name={"deadline"} id="inpdate" type={isInputDateMode ? "date" : "text"}
                       onBlur={() => setIsInputDateMode(false)} onFocus={() => setIsInputDateMode(true)}
                       placeholder="Set a deadline"
                       className="popup__input popup__input--date"/>
            </div>
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
            <div className="popup__descr">
                Enter a unique user ID for the invitation, comma separated
            </div>

            <div onClick={() => {
                let data = {
                    name: watch("name"),
                    freeEdits: watch("freeEdits"),
                    deadline: watch("deadline")
                }
                onSubmit(data)
            }} className="popup__btn input-id-button">Create a project
            </div>
        </form>
    </CustomPopup>


}
