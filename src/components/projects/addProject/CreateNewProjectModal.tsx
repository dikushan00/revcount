import React from 'react';
import {useOutsideAlerter} from "../../../utils/hooks/outsideClick";
import {CustomPopup} from "../../common/blocks/CustomPopup";

type PropsType = {
    hideBlock: () => void
}
export const CreateNewProjectModal: React.FC<PropsType> = ({hideBlock}) => {

    const [isInputDateMode, setIsInputDateMode] = React.useState(false)
    const addProjectRef = React.useRef(null)

    useOutsideAlerter(addProjectRef, hideBlock)
    const handleCloseModal = () => hideBlock()

    return <CustomPopup className={"popup__create"} modalBodyRef={addProjectRef}>
        <div className="popup__close" onClick={handleCloseModal}/>
        <h2 className="popup__title">
            Create a new project
        </h2>
        <form action="#" className="popup__form">
            <div className="popup__item">
                <input type="text" placeholder="Project name" className="popup__input"/>
            </div>
            <div className="popup__item">
                <input type="text" placeholder="Free edits in hours" className="popup__input"/>
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
                <input id="inpdate" type={isInputDateMode ? "date" : "text"}
                       onBlur={() => setIsInputDateMode(false)} onFocus={() => setIsInputDateMode(true)}
                       placeholder="Set a deadline"
                       className="popup__input popup__input--date"/>
            </div>
            <div className="popup__item">
                <label htmlFor="inpid" className="popup__id-block id-block">
                    <div className="id-block__item">
                        <div className="id-block__numer">888BA02</div>
                        <button className="id-block__btn">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18}
                                 viewBox="0 0 18 18">
                                <defs>
                                    <path id="avzva"
                                          d="M691.485 160.07l-1.414 1.415-7.071-7.071-7.071 7.071-1.414-1.414 7.07-7.071-7.07-7.071 1.414-1.415 7.07 7.071 7.072-7.07 1.414 1.414-7.07 7.07z"/>
                                </defs>
                                <g>
                                    <g transform="translate(-674 -144)">
                                        <use fill="#fff" xlinkHref="#avzva"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="id-block__item">
                        <div className="id-block__numer">111742</div>
                        <button className="id-block__btn">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18}
                                 viewBox="0 0 18 18">
                                <defs>
                                    <path id="avzva"
                                          d="M691.485 160.07l-1.414 1.415-7.071-7.071-7.071 7.071-1.414-1.414 7.07-7.071-7.07-7.071 1.414-1.415 7.07 7.071 7.072-7.07 1.414 1.414-7.07 7.07z"/>
                                </defs>
                                <g>
                                    <g transform="translate(-674 -144)">
                                        <use fill="#fff" xlinkHref="#avzva"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </label>
                <input id="inpid" type="text" placeholder={""} className="popup__input popup__input--id"/>
            </div>
            <div className="popup__descr">
                Enter a unique user ID for the invitation, comma separated
            </div>
            <button type="submit" className="popup__btn">Create a project</button>
        </form>
    </CustomPopup>


}
