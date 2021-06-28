import React, {KeyboardEventHandler} from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {Controller, useForm} from "react-hook-form";
import {RemoveItemIcon} from "../members/AddMemberToProjectModal";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {ProjectPostType} from "../../../src/types/projectTypes";
import {getUserId} from "../../../src/redux/projects-selector";
import {InputIdButton} from "../../styled/buttons/popup/PopupButtons";
import {
    InputTag,
    PopupClose,
    PopupDesc,
    PopupIcon,
    PopupInput,
    PopupInputDate,
    PopupInputId,
    PopupItem,
    PopupTitle
} from "../../styled/modals/components";
import {Toast, useToast} from "../../common/blocks/Toast";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {ValidationError} from "../../common/form/ValidationError";

type PropsType = {
    hideBlock: () => void
}

export const CreateNewProjectModal: React.FC<PropsType> = ({hideBlock}) => {


    const {show} = useToast()
    const dispatch = useDispatch()
    const {handleSubmit, control, formState: {errors}} = useForm();
    const addProjectRef = React.useRef(null)

    const [isInputDateMode, setIsInputDateMode] = React.useState(false)
    const [addedIds, setAddedIds] = React.useState([] as string[])
    const [error, setError] = React.useState("")

    const userId = useSelector(getUserId)

    const handleDeleteId = (id: string) => {
        const edited = addedIds.filter(item => item !== id)
        setAddedIds(edited)
    }

    useOutsideAlerter(addProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    const onSubmit = async (data: { name: string, freeEdits: string, deadline: string }) => {
        if (!addedIds.length) {
            setError("User ID field must not be empty")
            return
        }
        const invitations = addedIds.map(userId => ({user_id: userId}))

        let isDeadlineValid = new Date(data.deadline).getTime() > new Date().getTime()
        if (!isDeadlineValid) {
            setError("Deadline may not be earlier than next day!")
            return
        }
        let project = {
            name: data.name,
            deadline: data.deadline,
            balance: 0,
            included_revisions: 0,
            invitations,
        } as ProjectPostType

        userId && ProjectAPI.createProject(project, +userId).then(response => {
            dispatch(actionsProjects.addProject(response))
            dispatch(actionsProjects.setActiveProject(response))
            hideBlock()
        }).catch(res => {
            let errorMessage = res.response.data.message
            setError(errorMessage)
        })
    }

    const onPressEnterOnInput = (e:KeyboardEventHandler<HTMLInputElement>) => {
        //@ts-ignore
        if (e.code === "Enter") {
            //@ts-ignore
            let id = +e.target.value
            let isNumber = !isNaN(id)
            let isExist = addedIds.some(item => item === id.toString())
            if (isExist)
                return

            if (isNumber && id > 0 && !isExist) {
                setAddedIds(state => ([...state, id.toString()]))
                //@ts-ignore
                e.target.value = ""
            }
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("")
    }, [error])

    return <CustomPopup className={"popup__create"} modalBodyRef={addProjectRef}>
        <PopupClose onClick={handleCloseModal}/>
        <PopupTitle className="popup__title">
            Create a new project
        </PopupTitle>
        <div className="popup__form">
            <PopupItem className="popup__item">
                <Controller as={<PopupInput type="text" placeholder="Project name" className="popup__input"/>}
                            name="name"
                            rules={{required: true}}
                            control={control}
                            defaultValue={""}
                />

                {errors.name && <ValidationError/>}
            </PopupItem>
            <PopupItem className="popup__item">
                <Controller as={<PopupInput placeholder="Free edits in hours" className="popup__input"/>}
                            name="freeEdits"
                            rules={{required: true, pattern: /^[1-9]+/}}
                            control={control}
                            defaultValue={""}
                />
                {errors.freeEdits && <ValidationError>This field is required and should be number</ValidationError>}
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
                <Controller as={<PopupInputDate id="inpdate" type={isInputDateMode ? "date" : "text"}
                                                onBlur={() => setIsInputDateMode(false)}
                                                onFocus={() => setIsInputDateMode(true)}
                                                placeholder="Set a deadline"
                                                className="popup__input popup__input--date"/>}
                            name="deadline"
                            rules={{required: true}}
                            control={control}
                            defaultValue={""}
                />
                {errors.deadline && <ValidationError/>}
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
                    {/*@ts-ignore */}
                    <InputTag id="inpid" onKeyPress={onPressEnterOnInput} type="text" className="input_tag"/>
                </PopupInputId>
            </PopupItem>
            <PopupDesc className="popup__descr">
                Enter a unique user ID for the invitation, comma separated
            </PopupDesc>
            <InputIdButton onClick={handleSubmit(onSubmit)}>Create a project</InputIdButton>
        </div>
        <Toast/>
    </CustomPopup>
}
