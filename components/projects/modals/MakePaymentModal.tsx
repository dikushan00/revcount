import React from 'react';
import {OfferType} from "../../../src/types/projectTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useForm} from "react-hook-form";
import {useOutsideAlerter} from "../../../src/utils/hooks/outsideClick";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {actionsProjects} from "../../../src/redux/projects-reducer";

export const MakePaymentModal: React.FC<{ hideBlock: () => void, handleReserveMoney: () => void, offer: OfferType | undefined }>
    = ({handleReserveMoney, offer, hideBlock}) => {

    const balance = useSelector((state: AppStateType) => state.profile.profile?.balance)

    const dispatch = useDispatch()
    const {register, errors} = useForm()
    const modalRef = React.useRef(null)

    const [paymentMethod, setPaymentMethod] = React.useState<{ id: number, name: PaymentMethodsNames } | null>(null)

    useOutsideAlerter(modalRef, hideBlock)

    return <CustomPopup className={"popup__payment"} modalBodyRef={modalRef}>
        <div className="popup__close" onClick={hideBlock}/>
        <h2 className="popup__title">
            Total cost - <span>{offer?.balance}$</span>
        </h2>
        <form className="popup__form">
            <div className="popup__info">
                Pay from my balance
            </div>
            <div className="popup__item">
                <label onClick={handleReserveMoney} htmlFor="inprate" className="popup__method">
                    pay
                </label>
                <input ref={register} name={"pay"} id="inprate" type="text"
                       placeholder={balance?.toString() + "$" || "0"} className="popup__input popup__input--method"/>
            </div>
            <div className="popup__descr">
                Choose a payment method
            </div>
            <ul className="popup__block">
                {
                    paymentMethods?.map((item, index) => {
                        return <li key={index} onClick={() => setPaymentMethod({
                            id: item.id,
                            name: item.name
                        })} className={"popup__box " + (paymentMethod?.id === item.id ? "active" : "")}>
                            <span className="popup__link">
                                <picture>
                                    <source srcSet={item.imgPath} type="image/webp"/>
                                    <img src={item.imgPath} alt={item.name}/>
                                </picture>
                            </span>
                        </li>
                    })
                }
            </ul>
        </form>
    </CustomPopup>
}

const paymentMethods = [
    {
        id: 1,
        imgPath: "/img/modal/master-card.svg",
        name: "Master Card",
    },
    {
        id: 2,
        imgPath: "/img/modal/googlePay.svg",
        name: "Google Pay"
    },
    {
        id: 3,
        imgPath: "/img/modal/paypal.svg",
        name: "Paypal"
    }
] as { id: number, name: PaymentMethodsNames, imgPath: string }[]

type PaymentMethodsNames = "Master Card" | "Google Pay" | "Paypal"