import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {ValidationError} from "../../common/form/ValidationError";
import {useDispatch} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {Toast, useToast} from "../../common/blocks/Toast";
import {
    PopupButton,
    PopupClose,
    PopupDesc,
    PopupForm,
    PopupIcon,
    PopupInput,
    PopupInputDate,
    PopupItem,
    PopupTitle
} from "../../styled/modals/components";
import {ProjectAPI} from "../../../src/api/ProjectAPI";

type PropsType = {
    hideBlock: () => void
}
export const JoinProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register, errors} = useForm()
    const {show} = useToast()
    const joinProjectRef = React.useRef(null)

    const [error, setError] = React.useState("")

    useOutsideAlerter(joinProjectRef, hideBlock)

    const onSubmit = async (data: { projectId: number, username: string, hoursRate: number }) => {

        ProjectAPI.joinToProject(data.projectId, {
            username: data.username,
            hoursRate: data.hoursRate
        }).then (response => {
            if (response) {
                dispatch(actionsProjects.addProject(response))
                hideBlock()
            }
        }).catch(e =>{
            setError(e.response.data.message)
        })
    }

    React.useEffect(() => {
        error && show(error)
        return () => setError("")
    }, [error])

    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <PopupClose onClick={hideBlock} className="popup__close"/>
        <PopupTitle className="popup__title">
            Join the project
        </PopupTitle>
        <PopupForm onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <PopupItem className="popup__item">
                <PopupInput ref={register} name="projectId" type="text" placeholder="Unique project ID"
                       className="popup__input"/>
                {
                    errors.id && <ValidationError/>
                }
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupInput ref={register} name="username" type="text" placeholder="Your name" className="popup__input"/>
                {
                    errors.name && <ValidationError/>
                }
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupIcon htmlFor="inprate" className="popup__icon">
                    $
                </PopupIcon>
                <PopupInputDate id="inprate" name="hoursRate" type="number" placeholder="Hours Rate"
                       className="popup__input popup__input--date"/>
                {
                    errors.hoursRate && <ValidationError/>
                }
            </PopupItem>
            <PopupDesc className="popup__descr">
                Set the cost of one hour of your work in dollars
            </PopupDesc>
            <PopupButton type="submit">Join the project</PopupButton>
        </PopupForm>
        <Toast/>
    </CustomPopup>
}
