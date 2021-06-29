import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {CustomPopup} from "../../common/blocks/CustomPopup";
import {Controller, useForm} from "react-hook-form";
import {useOutsideAlerter} from "../../../src/utils/hooks/outsideClick";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
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
import {ValidationError} from "../../common/form/ValidationError";
import {Btn2AllWidth} from "../../styled/buttons/Buttons";
import axios from "axios";
import styled from "styled-components";

export const MakePaymentModal: React.FC<{ hideBlock: () => void, handleReserveMoney: () => void, amount: number }>
    = ({handleReserveMoney, amount: price, hideBlock}) => {

    const balance = useSelector((state: AppStateType) => state.projects.activeProject?.balance)

    const {control, handleSubmit, errors} = useForm()
    const modalRef = React.useRef(null)

    const [isProcessing, setProcessingTo] = React.useState(false);
    const [checkoutError, setCheckoutError] = React.useState();

    const elements = useElements()
    const stripe = useStripe()

    const [paymentMethod, setPaymentMethod] = React.useState<{ id: number, name: PaymentMethodsNames } | null>(null)

    useOutsideAlerter(modalRef, hideBlock)

    const handleCardDetailsChange = (ev: any) => {
        //@ts-ignore
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const onSubmit = async (data: { amount: number }) => {
        debugger
        setProcessingTo(true)
        try {
            const {data: clientSecret} = await axios.post('/api/payment_intents', {
                amount: +data.amount * 100
            })

            const cardElement = elements?.getElement(CardElement)
            const paymentMethodReq = await stripe?.createPaymentMethod({
                type: "card",
                //@ts-ignore
                card: cardElement
            })

            //@ts-ignore
            if (paymentMethodReq.error) {
                //@ts-ignore
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            //@ts-ignore
            const { error } = await stripe?.confirmCardPayment(clientSecret, {
                //@ts-ignore
                payment_method: paymentMethodReq?.paymentMethod?.id
            });

            if (error) {
                setCheckoutError(error?.message);
                setProcessingTo(false);
                return;
            }
            hideBlock()
            setProcessingTo(false)
        } catch (err) {
            setCheckoutError(err.message);
            setProcessingTo(false)
        }
    }
    return <CustomPopup className={"popup__payment"} modalBodyRef={modalRef}>
        <PopupClose onClick={hideBlock}/>
        <PopupTitle className="popup__title">
            Total cost - <span>{price || "0"}$</span>
        </PopupTitle>
        <PopupForm className="popup__form" onSubmit={handleSubmit(onSubmit)}>
            <PopupInfo className="popup__info">
                Pay from my balance
            </PopupInfo>
            <PopupItem className="popup__item">
                <label onClick={handleReserveMoney} htmlFor="inprate" className="popup__method">
                    pay
                </label>
                <Controller as={<PopupInput id="inprate" type="text"
                                            placeholder={balance?.toString() + "$" || "0"}
                                            className="popup__input popup__input--method"/>}
                            name="amount"
                            rules={{required: true, pattern: /\d+/}}
                            control={control}
                            defaultValue={""}
                />
                {errors.deadline && <ValidationError/>}
            </PopupItem>

            <CardElementContainer>
                <CardElement onChange={handleCardDetailsChange} options={cardElementOptions}/>
            </CardElementContainer>

            {checkoutError && <ValidationError>{checkoutError}</ValidationError>}
            <Btn2AllWidth disabled={false} type={"submit"} className={"tabs-popup__btn"}>
                {isProcessing ? "Processing..." : `Pay $${price}`}</Btn2AllWidth>
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
                                <ImgWrapper path={item.imgPath}/>
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

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin: 20px 0;

  & .StripeElement {
    width: 100%;
    padding: 15px;
    //padding: 25px 30px;
    //background: rgba(16, 120, 241, 0.05);
    //border-radius: 20px;
  }
`;
const cardElementOptions = {
    style: {
        base: {
            fontSize: "16px",
            color: "#000",
            "::placeholder": {
                color: "#1077f1"
            }
        },
        invalid: {
            color: "#FFC7EE",
            iconColor: "#FFC7EE",
        },
        complete: {
            iconColor: "#cbf4c9"
        }
    },
    iconStyle: "solid" as "default" | "solid" | undefined,
    hidePostalCode: true
}