import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {AcceptProjectUserType} from "../../sidebars/Sidebar";

type PropsType = {
    hideBlock: () => void
    handleAcceptProject: (n: AcceptProjectUserType) => void
    projectId: number
}
export const AcceptInvitationModal: React.FC<PropsType> = ({hideBlock, handleAcceptProject, projectId}) => {

    const {register, handleSubmit} = useForm()
    const joinProjectRef = React.useRef(null)

    useOutsideAlerter(joinProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    const onSubmit = (data: { name: string, hoursRate: string }) => {
        handleAcceptProject({name: data.name, hoursRate: +data.hoursRate, projectId})
        //@ts-ignore
        // ProjectAPI.acceptInvitation(1, {}).then(res => {
        //     !res?.error
        // })
    }
    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <div onClick={handleCloseModal} className="popup__close"/>
        <h2 className="popup__title">
            Otava Chemical
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <div className="popup__item">
                <input name = "name" ref={register} type="text" placeholder="Your name" className="popup__input"/>
            </div>
            <div className="popup__item">
                <label htmlFor="inprate" className="popup__icon">
                    $
                </label>
                <input name = "rate" ref={register} id="inprate" type="text" placeholder="Hours Rate"
                       className="popup__input popup__input--rate"/>
            </div>
            <div className="popup__descr">
                Set the cost of one hour of your work in dollars
            </div>
            <button type="submit" className="popup__btn">Accept Invitation</button>
        </form>
    </CustomPopup>
}
