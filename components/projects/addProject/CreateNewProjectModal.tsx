import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {RemoveItemIcon} from "../members/AddMemberToProjectModal";
import {useDispatch, useSelector} from "react-redux";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {ProjectPostType, ProjectType} from "../../../src/types/projectTypes";
import {getUserId} from "../../../src/redux/projects-selector";
import {InputIdDivButton} from "../../styled/buttons/popup/PopupButtons";
import {
    InputTag,
    PopupClose, PopupDesc,
    PopupForm,
    PopupIcon,
    PopupInput,
    PopupInputDate, PopupInputId,
    PopupItem,
    PopupTitle
} from "../../styled/modals/components";
import {useHttp} from "../../../src/utils/hooks/http.hook";
import {UserType} from "../../../src/types/userTypes";

type PropsType = {
    hideBlock: () => void
}
export const CreateNewProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register, watch} = useForm()
    const addProjectRef = React.useRef(null)
    const {clearError, request, error, loading} = useHttp()

    const [isInputDateMode, setIsInputDateMode] = React.useState(false)
    const [addedIds, setAddedIds] = React.useState([] as string[])

    const userId = useSelector(getUserId)

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }

    useOutsideAlerter(addProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    const onSubmit = async (data: { name: string, freeEdits: string, deadline: string }) => {
        const invitations = addedIds.map(userId => ({user_id: userId}))
        let project = {
            name: data.name,
            deadline: data.deadline,
            balance: 0,
            included_revisions: 0,
            invitations,
        } as ProjectPostType

        let response = userId && await request<ProjectType>(`users/${userId}/projects`, "post", project)
        if (response) {
            dispatch(actionsProjects.addProject(response))
            dispatch(actionsProjects.setActiveProject(response))
            hideBlock()
        }
    }

    return <CustomPopup className={"popup__create"} modalBodyRef={addProjectRef}>
        <PopupClose onClick={handleCloseModal}/>
        <PopupTitle className="popup__title">
            Create a new project
        </PopupTitle>
        <PopupForm onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <PopupItem className="popup__item">
                <PopupInput ref={register} name="name" type="text" placeholder="Project name" className="popup__input"/>
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupInput ref={register} name="freeEdits" type="text"
                            placeholder="Free edits in hours" className="popup__input"/>
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupIcon htmlFor="inpdate" className="popup__icon">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                            fill="#1078F1"/>
                    </svg>
                </PopupIcon>
                <PopupInputDate ref={register} name={"deadline"} id="inpdate" type={isInputDateMode ? "date" : "text"}
                       onBlur={() => setIsInputDateMode(false)} onFocus={() => setIsInputDateMode(true)}
                       placeholder="Set a deadline"
                       className="popup__input popup__input--date"/>
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupInputId className="popup__input popup__input--id">
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
                    <InputTag id="inpid" onKeyPress={e => {
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
                </PopupInputId>
            </PopupItem>
            <PopupDesc className="popup__descr">
                Enter a unique user ID for the invitation, comma separated
            </PopupDesc>

            <InputIdDivButton onClick={() => {
                let data = {
                    name: watch("name"),
                    freeEdits: watch("freeEdits"),
                    deadline: watch("deadline")
                }
                onSubmit(data)
            }}>Create a project
            </InputIdDivButton>
        </PopupForm>
    </CustomPopup>


}
