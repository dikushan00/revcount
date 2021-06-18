import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {useForm} from "react-hook-form";
import {useOutsideAlerter} from "../../../src/utils/hooks/outsideClick";
import {ValidOfferType} from "../edits/Edit";
import {
    PopupBlock,
    PopupBox,
    PopupClose,
    PopupDesc,
    PopupForm,
    PopupInfo,
    PopupInput,
    PopupItem,
    PopupLink,
    PopupTitle
} from "../../styled/modals/components";
import {ImgWrapper} from "../../common/blocks/ImgWrapper";

export const MakePaymentModal: React.FC<{ hideBlock: () => void, handleReserveMoney: () => void, offer: ValidOfferType | null }>
    = ({handleReserveMoney, offer, hideBlock}) => {

    const balance = useSelector((state: AppStateType) => state.profile.profile?.balance)

    const {register} = useForm()
    const modalRef = React.useRef(null)

    const [paymentMethod, setPaymentMethod] = React.useState<{ id: number, name: PaymentMethodsNames } | null>(null)

    useOutsideAlerter(modalRef, hideBlock)

    return <CustomPopup className={"popup__payment"} modalBodyRef={modalRef}>
        <PopupClose onClick={hideBlock}/>
        <PopupTitle className="popup__title">
            Total cost - <span>{offer?.amount}$</span>
        </PopupTitle>
        <PopupForm className="popup__form">
            <PopupInfo className="popup__info">
                Pay from my balance
            </PopupInfo>
            <PopupItem className="popup__item">
                <label onClick={handleReserveMoney} htmlFor="inprate" className="popup__method">
                    pay
                </label>
                <PopupInput ref={register} name={"pay"} id="inprate" type="text"
                       placeholder={balance?.toString() + "$" || "0"} className="popup__input popup__input--method"/>
            </PopupItem>
            <PopupDesc className="popup__descr">
                Choose a payment method
            </PopupDesc>
            <PopupBlock className="popup__block">
                {
                    paymentMethods?.map((item, index) => {
                        return <PopupBox key={index} onClick={() => setPaymentMethod({
                            id: item.id,
                            name: item.name
                        })} className={"popup__box " + (paymentMethod?.id === item.id ? "active" : "")}>
                            <PopupLink className="popup__link">
                                <ImgWrapper path={item.imgPath} />
                            </PopupLink>
                        </PopupBox>
                    })
                }
            </PopupBlock>
        </PopupForm>
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