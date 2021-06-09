import React from 'react';
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useOutsideAlerter} from '../../../src/utils/hooks/outsideClick';

type PropsType = {
    hideBlock: () => void
}
export const JoinProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const joinProjectRef = React.useRef(null)

    useOutsideAlerter(joinProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    return <CustomPopup className={"popup__join"} modalBodyRef={joinProjectRef}>
        <div onClick={handleCloseModal} className="popup__close"/>
        <h2 className="popup__title">
            Join the project
        </h2>
        <form action="#" className="popup__form">
            <div className="popup__item">
                <input type="text" placeholder="Unique project ID" className="popup__input"/>
            </div>
            <div className="popup__item">
                <input type="text" placeholder="Your name" className="popup__input"/>
            </div>
            <div className="popup__item">
                <label htmlFor="inprate" className="popup__icon">
                    $
                </label>
                <input id="inprate" type="text" placeholder="Hours Rate" className="popup__input popup__input--date"/>
            </div>
            <div className="popup__descr">
                Set the cost of one hour of your work in dollars
            </div>
            <button type="submit" className="popup__btn">Join the project</button>
        </form>
    </CustomPopup>
}
