import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {ValidationError} from "../../common/form/ValidationError";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";

type PropsType = {
    hideBlock: () => void
}
export const JoinProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register, errors} = useForm()
    const joinProjectRef = React.useRef(null)

    const profileId = useSelector((state: AppStateType) => state.profile.profile?.id)

    useOutsideAlerter(joinProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    const onSubmit = (data: any) => {
        profileId && ProjectAPI.joinToProject(1, profileId).then(res => {
            !res?.error && dispatch(actionsProjects.addProject(res))
        })
    }

    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <div onClick={handleCloseModal} className="popup__close"/>
        <h2 className="popup__title">
            Join the project
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <div className="popup__item">
                <input ref={register} name = "id" type="text" placeholder="Unique project ID" className="popup__input"/>
                {
                    errors.id && <ValidationError/>
                }
            </div>
            <div className="popup__item">
                <input ref = {register} name = "name" type="text" placeholder="Your name" className="popup__input"/>
                {
                   errors.name && <ValidationError/>
                }
            </div>
            <div className="popup__item">
                <label htmlFor="inprate" className="popup__icon">
                    $
                </label>
                <input id="inprate" name="hoursRate" type="number" placeholder="Hours Rate" className="popup__input popup__input--date"/>
                {
                    errors.hoursRate && <ValidationError/>
                }
            </div>
            <div className="popup__descr">
                Set the cost of one hour of your work in dollars
            </div>
            <button type="submit" className="popup__btn">Join the project</button>
        </form>
    </CustomPopup>
}
