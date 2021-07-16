import React from 'react';
import {OfferConditionsBlock} from "../EditControlPanel";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {actionsProjects} from "../../../../src/redux/projects-reducer";
import {useHttp} from "../../../../src/utils/hooks/http.hook";
import {OfferType} from "../../../../src/types/projectTypes";
import {OfferEditsAcceptButton} from "../../../styled/buttons/revisionButtons/RevisionsButtons";
import {ControlEdits, OfferEdits, OfferEditsForm} from "../../../styled/edit/components";
import {ValidOfferType} from "../../../../pages/projects/[projectId]/revisions/[revisionId]";
import {useToast} from "../../../common/blocks/Toast";

type PropsType = {
    revisionId: number | undefined,
    setOffer: (n: ValidOfferType) => void
}

export const ArtistsControlPanel: React.FC<PropsType> = ({revisionId, setOffer}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm()
    const {request, error, clearError} = useHttp()
    const {show} = useToast()

    const onSubmit = async (data: { days: string, hours: string, balance: string }) => {
        const {days, hours} = data
        let dateNow = new Date().getTime()
        let oneDay = 86400000
        let oneHour = 3600000
        let deadline = dateNow + (oneDay * +days) + (oneHour * +hours)

        let deadlineDate = new Date(deadline).toISOString()

        let response = await request<OfferType>(`revisions/${revisionId}/offer`, "post", {
            deadline: deadlineDate,
            amount: data.balance
        })
        if (response) {
            revisionId && dispatch(actionsProjects.setActiveProjectOffer(revisionId, response))
            //@ts-ignore
            setOffer((state) => ({...state, status: "PENDING"}))
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    return <ControlEdits>
        <OfferEdits>
            <OfferEditsForm onSubmit={handleSubmit(onSubmit)}>
                <OfferConditionsBlock register={register}/>
                <div className="offer-edits__block">
                    <OfferEditsAcceptButton type={"submit"}>Send an offer</OfferEditsAcceptButton>
                </div>
            </OfferEditsForm>
        </OfferEdits>
    </ControlEdits>
};
