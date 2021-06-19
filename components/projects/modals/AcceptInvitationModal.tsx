import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';
import {useForm} from "react-hook-form";
import {AcceptProjectUserType} from "../../sidebars/Sidebar";
import {
    PopupButton,
    PopupClose,
    PopupDesc,
    PopupForm,
    PopupIcon,
    PopupInput,
    PopupItem,
    PopupTitle
} from "../../styled/modals/components";

type PropsType = {
    hideBlock: () => void
    handleAcceptProject: (n: AcceptProjectUserType) => void
    invitationId: number
}

export const AcceptInvitationModal: React.FC<PropsType> = ({hideBlock, handleAcceptProject, invitationId}) => {

    const {register, handleSubmit} = useForm()
    const joinProjectRef = React.useRef(null)

    useOutsideAlerter(joinProjectRef, hideBlock)

    const onSubmit = (data: { name: string, hoursRate: string }) => {
        handleAcceptProject({name: data.name, hoursRate: +data.hoursRate, invitationId})
    }
    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <PopupClose onClick={hideBlock}/>
        <PopupTitle className="popup__title">
            Otava Chemical
        </PopupTitle>
        <PopupForm onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <PopupItem className="popup__item">
                <PopupInput name = "name" ref={register} type="text" placeholder="Your name" className="popup__input"/>
            </PopupItem>
            <PopupItem className="popup__item">
                <PopupIcon htmlFor="inprate" className="popup__icon">
                    $
                </PopupIcon>
                <PopupInput name = "rate" ref={register} id="inprate" type="text" placeholder="Hours Rate"
                       className="popup__input popup__input--rate"/>
            </PopupItem>
            <PopupDesc className="popup__descr">
                Set the cost of one hour of your work in dollars
            </PopupDesc>
            <PopupButton type="submit">Accept Invitation</PopupButton>
        </PopupForm>
    </CustomPopup>
}
