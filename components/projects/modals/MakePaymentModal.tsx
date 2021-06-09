import React from 'react';
import {OfferType} from "../../../src/types/projectTypes";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {CustomPopup} from "../../common/blocks/CustomPopup";

export const MakePaymentModal: React.FC<{hideBlock: () => void, offer: OfferType | undefined}> = ({offer, hideBlock}) => {

    const balance = useSelector((state: AppStateType) => state.profile.profile?.balance)
    return <CustomPopup className={"popup__payment"}>
        <div className="popup__close" onClick={hideBlock}/>
        <h2 className="popup__title">
            Total cost - <span>{offer?.balance}$</span>
        </h2>
        <form action="#" className="popup__form">
            <div className="popup__info">
                Pay from my balance
            </div>
            <div className="popup__item">
                <label htmlFor="inprate" className="popup__method">
                    pay
                </label>
                <input id="inprate" type="text" placeholder={balance?.toString() + "$" || "0"} className="popup__input popup__input--method"/>
            </div>
            <div className="popup__descr">
                Choose a payment method
            </div>
            <ul className="popup__block">
                {
                    paymentMethods?.map(item => {
                        return <li className="popup__box">
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
        imgPath: "/img/modal/master-card.svg",
        name: "Master Card"
    },
    {
        imgPath: "/img/modal/googlePay.svg",
        name: "Google Pay"
    },
    {
        imgPath: "/img/modal/paypal.svg",
        name: "Paypal"
    }
]