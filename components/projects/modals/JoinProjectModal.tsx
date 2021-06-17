import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {ValidationError} from "../../common/form/ValidationError";
import {useDispatch} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {Toast, useToast} from "../../common/blocks/Toast";
import {useHttp} from "../../../src/utils/hooks/http.hook";

type PropsType = {
    hideBlock: () => void
}
export const JoinProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register, errors} = useForm()
    const {show} = useToast()
    const {clearError, request, error, loading} = useHttp()
    const joinProjectRef = React.useRef(null)

    useOutsideAlerter(joinProjectRef, hideBlock)

    const onSubmit = async (data: { projectId: number, username: string, hoursRate: number }) => {
        let response = data.projectId && await request(`projects/${data.projectId}/users`, "post", {
            username: data.username,
            hoursRate: data.hoursRate
        })
        if (response) {
            !response?.error && dispatch(actionsProjects.addProject(response))
            hideBlock()
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <div onClick={hideBlock} className="popup__close"/>
        <h2 className="popup__title">
            Join the project
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <div className="popup__item">
                <input ref={register} name="projectId" type="text" placeholder="Unique project ID"
                       className="popup__input"/>
                {
                    errors.id && <ValidationError/>
                }
            </div>
            <div className="popup__item">
                <input ref={register} name="username" type="text" placeholder="Your name" className="popup__input"/>
                {
                    errors.name && <ValidationError/>
                }
            </div>
            <div className="popup__item">
                <label htmlFor="inprate" className="popup__icon">
                    $
                </label>
                <input id="inprate" name="hoursRate" type="number" placeholder="Hours Rate"
                       className="popup__input popup__input--date"/>
                {
                    errors.hoursRate && <ValidationError/>
                }
            </div>
            <div className="popup__descr">
                Set the cost of one hour of your work in dollars
            </div>
            <button disabled={loading} type="submit" className="popup__btn">Join the project</button>
        </form>
        <Toast />
    </CustomPopup>
}
