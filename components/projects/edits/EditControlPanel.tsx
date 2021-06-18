import React from 'react';
import {EditType, ProjectType, StatusesNamesType} from "../../../src/types/projectTypes";
import {MakePaymentModal} from "../modals/MakePaymentModal";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {ValidOfferType} from "./Edit";
import {useHttp} from "../../../src/utils/hooks/http.hook";
import {Toast, useToast} from "../../common/blocks/Toast";
import {
    BlueEditButton,
    CompleteButton,
    OfferEditsAcceptButton, OfferEditsDeclineButton,
    PanelEditsButton
} from "../../styled/buttons/revisionButtons/RevisionsButtons";
import {
    ControlEdits,
    ControlEditsHeader,
    ControlEditsLabel,
    EditsLabel,
    OfferEdits, OfferEditsBlock,
    OfferEditsForm,
    OfferEditsHeader, OfferEditsReserveBtn,
    PanelEdits,
    PanelEditsItem
} from "../../styled/edit/components";

type PropsType = { offer: ValidOfferType | null, edit: EditType | null, project: ProjectType | null, closePage: () => void }

export const EditControlPanel: React.FC<PropsType> = ({
                                                          offer,
                                                          closePage,
                                                          edit,
                                                          project
                                                      }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {show} = useToast()
    const {request, error, clearError} = useHttp()
    const [isPaymentModalShowMode, setIsPaymentModalShowMode] = React.useState(false)

    const changeStatus = (status: StatusesNamesType) => {
        let edits = project?.revisions
        let editId = edit?.revision_id

        if (edits && editId) {
            edits = edits.map(item => {
                if (item.revision_id === editId) {
                    return {
                        ...item,
                        description: "",
                        status: status
                    }
                }
                return item
            })
        }

        return edits || []
    }

    const handleReserveMoney = async () => {
        // let changedStatusEdits: EditType[] = changeStatus("Performing")

        let response = await request(`projects/${project?.project_id}/reserve`, "post")
        if(response) {
            router.push("/projects/" + project?.project_id)
            closePage()
            setIsPaymentModalShowMode(false)
        }
    }
    const handleAcceptOffer = async () => {
        // let changedStatusEdits: EditType[] = changeStatus("Performing")

        let response = await request(`projects/${project?.project_id}/accept_offer`, "post")
        if(response) {
            router.push("/projects/" + project?.project_id)
            closePage()
            setIsPaymentModalShowMode(false)
        }
    }
    const handleDeclineOffer = () => {
        router.push("/projects/" + project?.project_id)
        closePage()
    }
    const handleCompleteProject = async () => {
        // let changedStatusEdits: EditType[] = changeStatus("Performing")

        let response = await request(`projects/${project?.project_id}/complete_project`, "post")
        if(response) {
            router.push("/projects/" + project?.project_id)
            closePage()
            setIsPaymentModalShowMode(false)
        }
    }

    const enablePaymentMode = () => setIsPaymentModalShowMode(true)

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    return <>
        <Toast />
        <ControlEdits>
            <ControlEditsHeader>
                <ControlEditsLabel>
                    Control Panel
                </ControlEditsLabel>
            </ControlEditsHeader>
            {
                edit?.status === "Editing is done"
                    ? <CompletedEditBlock/>
                    : <DefaultControlPanel offer={offer} handleCompleteProject={handleCompleteProject}
                                           handleReserveMoney={handleReserveMoney}
                                           handleAcceptOffer={handleAcceptOffer}
                                           handleDeclineOffer={handleDeclineOffer}
                                           edit={edit}
                                           enablePaymentMode={enablePaymentMode}
                                           editStatusName={edit?.status}/>
            }
        </ControlEdits>
        {
            isPaymentModalShowMode &&
            <MakePaymentModal handleReserveMoney={handleReserveMoney} hideBlock={() => setIsPaymentModalShowMode(false)}
                              offer={offer}/>
        }
    </>
}

type DefaultControlPanel = {
    editStatusName: StatusesNamesType | undefined,
    edit: EditType | null,
    offer: ValidOfferType | null,
    handleAcceptOffer: () => void,
    handleDeclineOffer: () => void,
    enablePaymentMode: () => void,
    handleReserveMoney: () => void,
    handleCompleteProject: () => void
}
const DefaultControlPanel: React.FC<DefaultControlPanel> = ({
                                                                editStatusName,
                                                                handleReserveMoney,
                                                                edit,
                                                                handleDeclineOffer,
                                                                handleAcceptOffer,
                                                                enablePaymentMode,
                                                                offer,
                                                                handleCompleteProject
                                                            }) => {
    return <>
        <PanelEdits>
            <PanelEditsItem>
                <PanelEditsButton className="panel-edits__btn panel-edits__btn--freeze">
                    Freeze
                    <FreezeIcon/>
                </PanelEditsButton>
            </PanelEditsItem>
            <PanelEditsItem>
                <PanelEditsButton className="panel-edits__btn panel-edits__btn--resume">
                    Resume
                    <ResumeIcon/>
                </PanelEditsButton>
            </PanelEditsItem>
            <PanelEditsItem>
                <PanelEditsButton className="panel-edits__btn panel-edits__btn--replace">
                    Replace the artist
                    <ReplaceIcon/>
                </PanelEditsButton>
            </PanelEditsItem>
            <PanelEditsItem>
                <PanelEditsButton className="panel-edits__btn panel-edits__btn--remove">
                    Remove edit
                    <RemoveIcon/>
                </PanelEditsButton>
            </PanelEditsItem>
            {editStatusName === "Performing" &&
            <PanelEditsItem>
                <CompleteButtonComponent onClick={handleCompleteProject}/>
            </PanelEditsItem>}
        </PanelEdits>
        {
            editStatusName === "Approval" && edit?.status && <AcceptOfferBlock
                offer={offer} handleAcceptOffer={handleAcceptOffer} handleDeclineOffer={handleDeclineOffer}/>
        }
        {
            editStatusName === "Reservation" && !edit?.status && <ReservationControlBlock
                offer={offer} handleReserveMoney={handleReserveMoney} enablePaymentMode={enablePaymentMode}/>
        }
    </>
}
const AcceptOfferBlock: React.FC<{
    offer: ValidOfferType | null,
    handleAcceptOffer: () => void,
    handleDeclineOffer: () => void
}> = ({offer, handleAcceptOffer, handleDeclineOffer}) => {
    return <OfferEdits>
        <OfferEditsHeader>
            <EditsLabel>Offer</EditsLabel>
        </OfferEditsHeader>
        <OfferEditsForm>
            <OfferConditionsBlock offer={offer}/>
            <OfferEditsBlock>
                <OfferEditsAcceptButton onClick={handleAcceptOffer} >Accept</OfferEditsAcceptButton>
                <OfferEditsDeclineButton onClick={handleDeclineOffer}>Decline</OfferEditsDeclineButton>
            </OfferEditsBlock>
        </OfferEditsForm>
    </OfferEdits>
}
const ReservationControlBlock: React.FC<{ offer: ValidOfferType | null, handleReserveMoney: () => void, enablePaymentMode: () => void }> = ({
                                                                                                                                                offer,
                                                                                                                                                enablePaymentMode
                                                                                                                                            }) => {
    return <>
        <OfferEdits>
            <OfferEditsHeader>
                <EditsLabel>
                    Reservation
                </EditsLabel>
            </OfferEditsHeader>
            <OfferEditsForm>
                <OfferConditionsBlock offer={offer}/>
                <OfferEditsBlock>
                    <OfferEditsReserveBtn onClick={enablePaymentMode}>
                        Reserve money
                    </OfferEditsReserveBtn>
                </OfferEditsBlock>
            </OfferEditsForm>
        </OfferEdits>
    </>
}

export const OfferConditionsBlock: React.FC<{ offer?: ValidOfferType | null, register?: any }> = ({
                                                                                                      offer,
                                                                                                      register
                                                                                                  }) => {
    return <>
        <div className="offer-edits__item">
            <div className="offer-edits__signature">
                Deadline
            </div>
            <div className="offer-edits__box offer-edits__box--days">
                <input ref={register} className="offer-edits__input" type="text" name="days"
                       placeholder={offer?.days.toString() || "0"}
                       defaultValue={offer?.days.toString()}/>
                <div className="offer-edits__designation">days</div>
            </div>
        </div>
        <div className="offer-edits__item">
            <div className="offer-edits__signature">
                Time for work in hours
            </div>
            <div className="offer-edits__box offer-edits__box--time">
                <input ref={register} className="offer-edits__input" type="text" name="hours"
                       placeholder={offer?.hours.toString() || "0"}
                       defaultValue={offer?.hours.toString()}/>
                <div className="offer-edits__designation">hrs.</div>
            </div>
        </div>
        <div className="offer-edits__item">
            <div className="offer-edits__signature">
                Total edit cost
            </div>
            <div className="offer-edits__box offer-edits__box--total">
                <input ref={register} className="offer-edits__input" type="number" name="balance"
                       placeholder={offer?.amount.toString()}
                       max={24}
                       defaultValue={offer?.amount.toString() || "0"}/>
                <div className="offer-edits__designation">$</div>
            </div>
        </div>
    </>
}

const CompletedEditBlock = () => {

    return <div className="control-edits__prepare">
        <div className="control-edits__block">
            <DeleteEditHistoryButton/>
            <AddNewCorrectionButton/>
        </div>
    </div>
}

const FreezeIcon = () => {
    return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.53493 10.3286C4.53493 11.2516 3.78656 12 2.8635 12C1.94044 12 1.19206 11.2516 1.19206 10.3286V1.67143C1.19206 0.748377 1.94044 0 2.8635 0C3.78656 0 4.53493 0.748377 4.53493 1.67143V10.3286Z"
            fill="#888BA0"/>
        <path
            d="M10.8078 10.3286C10.8078 11.2516 10.0594 12 9.13636 12C8.2133 12 7.46493 11.2516 7.46493 10.3286V1.67143C7.46518 0.748377 8.21356 0 9.13636 0C10.0594 0 10.8078 0.748377 10.8078 1.67143V10.3286Z"
            fill="#888BA0"/>
    </svg>
}
const ResumeIcon = () => {
    return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.9228 5.35347L1.82327 0.100135C1.59212 -0.0332155 1.30802 -0.0332155 1.07712 0.100135C0.846213 0.233233 0.704041 0.479515 0.704041 0.746215V11.2539C0.704041 11.5206 0.846213 11.7669 1.07712 11.9C1.19257 11.9675 1.32138 12.0001 1.4502 12.0001C1.57901 12.0001 1.70782 11.9665 1.82327 11.9L10.9228 6.64664C11.1543 6.51329 11.2957 6.26701 11.2957 6.00031C11.2957 5.73361 11.1537 5.48708 10.9228 5.35347Z"
            fill="#888BA0"/>
    </svg>
}
const ReplaceIcon = () => {
    return <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.6492 7.75408C12.1263 7.65203 12.5665 7.25761 12.6382 6.38286C12.6973 5.66691 12.5137 5.2981 12.2426 5.11015C12.9952 2.04264 10.9194 1.44214 10.9194 1.44214C10.9194 1.44214 9.36813 -1.18957 6.3416 0.657237C5.95663 0.892078 5.3581 1.34206 5.00151 1.80662C4.42898 2.41579 4.03929 3.40598 3.97822 5.00967C3.60862 5.15074 3.31822 5.50773 3.39033 6.38247C3.46598 7.29701 3.94315 7.68631 4.44514 7.7659C5.12287 9.41649 6.46099 10.7767 8.04459 10.7767C9.63173 10.7767 10.9726 9.41018 11.6492 7.75408ZM8.04459 10.0071C6.21354 10.0071 4.73908 7.52082 4.73908 5.46202C4.73908 5.17989 4.74815 4.91826 4.76548 4.67554C7.4437 4.79256 9.02769 3.71884 9.88982 2.78735C10.7074 3.6022 11.1322 4.63141 11.3493 5.39543C11.3493 5.41749 11.3497 5.43916 11.3497 5.46162C11.3501 7.52082 9.87603 10.0071 8.04459 10.0071Z"
            fill="#888BA0"/>
        <path
            d="M6.99568 13.1199L7.20766 12.2424C7.23209 12.1412 7.2845 12.0545 7.35543 11.9879C7.33375 11.9725 7.31248 11.9564 7.29159 11.9394L5.39789 10.3716L4.24536 10.6411C2.29374 11.1001 0.918579 12.7484 0.918579 14.6389V17.1213C0.918579 17.6099 1.35319 17.9996 1.87331 17.9996H6.75177L7.4957 13.759C7.16156 13.7547 6.91687 13.4462 6.99568 13.1199Z"
            fill="#888BA0"/>
        <path
            d="M11.7744 10.6411L10.6376 10.3716L8.74589 11.9394C8.72501 11.9564 8.70452 11.9725 8.68285 11.9879C8.75417 12.0545 8.80657 12.1412 8.8314 12.2424L9.04299 13.1199C9.12219 13.4458 8.8775 13.7547 8.54297 13.7594L9.28689 18H14.1654C14.6855 18 15.0811 17.6107 15.0811 17.1217V14.6393C15.0819 12.7484 13.726 11.1001 11.7744 10.6411Z"
            fill="#888BA0"/>
    </svg>
}
const RemoveIcon = () => {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.4167 2.33332H12.25H10.3717L10.1797 1.56565C9.94993 0.644 9.12507 0 8.17482 0H5.82515C4.8749 0 4.05007 0.644 3.82022 1.56568L3.6283 2.33335H1.75H0.583324C0.26075 2.33332 0 2.59468 0 2.91668C0 3.23868 0.26075 3.5 0.583324 3.5H1.19815L1.68932 12.3468C1.74125 13.2737 2.5095 14 3.43757 14H10.5624C11.4905 14 12.2587 13.2737 12.3106 12.3468L12.8018 3.5H13.4166C13.7392 3.5 14 3.23868 14 2.91668C14 2.59468 13.7393 2.33332 13.4167 2.33332ZM4.95132 1.84857C5.05225 1.44725 5.411 1.16665 5.82515 1.16665H8.17482C8.589 1.16665 8.94775 1.44722 9.04865 1.84857L9.1694 2.33332H4.83057L4.95132 1.84857ZM5.25 11.0833C5.25 11.4053 4.98925 11.6666 4.66668 11.6666C4.3441 11.6666 4.08335 11.4053 4.08335 11.0833V5.25C4.08335 4.928 4.3441 4.66668 4.66668 4.66668C4.98925 4.66668 5.25 4.928 5.25 5.25V11.0833ZM7.58332 11.0833C7.58332 11.4053 7.32257 11.6666 7 11.6666C6.67743 11.6666 6.41668 11.4053 6.41668 11.0833V5.25C6.41668 4.928 6.67743 4.66668 7 4.66668C7.32257 4.66668 7.58332 4.928 7.58332 5.25V11.0833ZM9.91668 11.0833C9.91668 11.4053 9.65593 11.6666 9.33335 11.6666C9.01078 11.6666 8.75003 11.4053 8.75003 11.0833V5.25C8.75003 4.928 9.01078 4.66668 9.33335 4.66668C9.65593 4.66668 9.91668 4.928 9.91668 5.25V11.0833Z"
            fill="#888BA0"/>
    </svg>
}

const CompleteButtonComponent: React.FC<{ onClick: () => void }> = ({onClick}) => {
    return <CompleteButton onClick={onClick} className="panel-edits__btn">

            Complete the project
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.798 12.2248C19.1512 17.7837 10.9678 10.6871 6.47105 16.7831L3.2699 5.32749C7.76659 -0.768544 15.95 6.32809 20.5968 0.769234C20.8234 0.495759 21.0413 0.613483 20.9918 1.01159C20.6957 3.41269 20.2368 5.79092 19.6185 8.12987C19.5782 8.26623 19.6194 8.4136 19.7245 8.50936C20.9714 9.65326 22.3725 10.6168 23.8869 11.3717C24.0697 11.4506 24.0249 11.9512 23.798 12.2248Z"
                fill="#1E8D5F"/>
            <path
                d="M20.9917 1.0097C20.6962 3.41196 20.2372 5.79128 19.6179 8.13108C19.6049 8.17113 19.602 8.21379 19.6096 8.25522C14.9917 10.2456 8.65651 6.0828 4.79582 10.7835C4.28685 8.9628 3.77789 7.14349 3.26892 5.32556C7.76685 -0.769615 15.9517 6.32694 20.5986 0.769696C20.822 0.496592 21.0413 0.612454 20.9917 1.0097Z"
                fill="#24A06C"/>
            <path
                d="M1.42346 5.94625L6.12415 22.7752C6.24006 23.1896 6.66944 23.4321 7.08415 23.3173L7.4607 23.2097C7.65906 23.1547 7.82733 23.0229 7.92828 22.8435C8.02923 22.6642 8.05455 22.4519 7.99863 22.2538L6.47174 16.7835C5.40415 12.9725 4.33932 9.16004 3.27726 5.34625L3.26898 5.32556"
                fill="#5F5346"/>
            <path
                d="M1.86207 6.00002C2.89046 6.00002 3.72414 5.16634 3.72414 4.13795C3.72414 3.10956 2.89046 2.27588 1.86207 2.27588C0.833677 2.27588 0 3.10956 0 4.13795C0 5.16634 0.833677 6.00002 1.86207 6.00002Z"
                fill="#547580"/>
            <path
                d="M1.03451 4.34489C1.37731 4.34489 1.6552 4.067 1.6552 3.72421C1.6552 3.38141 1.37731 3.10352 1.03451 3.10352C0.691711 3.10352 0.413818 3.38141 0.413818 3.72421C0.413818 4.067 0.691711 4.34489 1.03451 4.34489Z"
                fill="#95A5A5"/>
        </svg>
    </CompleteButton>
}
const AddNewCorrectionButton = () => {
    return <BlueEditButton className="panel-edits__btn btn-blue">
        Add new correction <span>+</span>
    </BlueEditButton>
}
const DeleteEditHistoryButton = () => {
    return <PanelEditsButton className="panel-edits__btn">
        Delete the history of this edit
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4167 2.33332H12.25H10.3717L10.1797 1.56565C9.94993 0.644 9.12507 0 8.17482 0H5.82515C4.8749 0 4.05007 0.644 3.82022 1.56568L3.6283 2.33335H1.75H0.583324C0.26075 2.33332 0 2.59468 0 2.91668C0 3.23868 0.26075 3.5 0.583324 3.5H1.19815L1.68932 12.3468C1.74125 13.2737 2.5095 14 3.43757 14H10.5624C11.4905 14 12.2587 13.2737 12.3106 12.3468L12.8018 3.5H13.4166C13.7392 3.5 14 3.23868 14 2.91668C14 2.59468 13.7393 2.33332 13.4167 2.33332ZM4.95132 1.84857C5.05225 1.44725 5.411 1.16665 5.82515 1.16665H8.17482C8.589 1.16665 8.94775 1.44722 9.04865 1.84857L9.1694 2.33332H4.83057L4.95132 1.84857ZM5.25 11.0833C5.25 11.4053 4.98925 11.6666 4.66668 11.6666C4.3441 11.6666 4.08335 11.4053 4.08335 11.0833V5.25C4.08335 4.928 4.3441 4.66668 4.66668 4.66668C4.98925 4.66668 5.25 4.928 5.25 5.25V11.0833ZM7.58332 11.0833C7.58332 11.4053 7.32257 11.6666 7 11.6666C6.67743 11.6666 6.41668 11.4053 6.41668 11.0833V5.25C6.41668 4.928 6.67743 4.66668 7 4.66668C7.32257 4.66668 7.58332 4.928 7.58332 5.25V11.0833ZM9.91668 11.0833C9.91668 11.4053 9.65593 11.6666 9.33335 11.6666C9.01078 11.6666 8.75003 11.4053 8.75003 11.0833V5.25C8.75003 4.928 9.01078 4.66668 9.33335 4.66668C9.65593 4.66668 9.91668 4.928 9.91668 5.25V11.0833Z"
                fill="#888BA0"/>
        </svg>
    </PanelEditsButton>
}

