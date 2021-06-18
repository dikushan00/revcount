import React from 'react';
import {OfferConditionsBlock} from "../EditControlPanel";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {actionsProjects} from "../../../../src/redux/projects-reducer";
import {RoleType} from "../../../../src/types/userTypes";
import {useHttp} from "../../../../src/utils/hooks/http.hook";
import {OfferType} from "../../../../src/types/projectTypes";
import {OfferEditsAcceptButton} from "../../../styled/buttons/revisionButtons/RevisionsButtons";
import {ControlEdits, EditsLabel, OfferEdits, OfferEditsForm, OfferEditsHeader} from "../../../styled/edit/components";

export const ArtistsControlPanel: React.FC<{ projectId: number, revisionId: number | undefined, role: RoleType }> = ({
                                                                                                                                         role,
                                                                                                                                         projectId,
                                                                                                                                         revisionId,
                                                                                                                                     }) => {

    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm()
    const {request, error} = useHttp()

    const onSubmit = async (data: { days: string, hours: string, balance: string }) => {
        const {days, hours} = data
        let dateNow = new Date().getTime()
        let oneDay = 86400000
        let oneHour = 3600000
        let deadline = dateNow + (oneDay * +days) + (oneHour * +hours)
        let deadlineDate = new Date(deadline).toLocaleString()

        let response = await request<OfferType>(`revisions/${revisionId}/offer/${projectId}`, "post", {deadline: deadlineDate, amount: data.balance})
        if(response) {
            revisionId && dispatch(actionsProjects.setActiveProjectOffer(revisionId, response))
        }
    }

    return <ControlEdits>
        <OfferEdits>
            {role.name !== "Artist" &&
            <OfferEditsHeader>
                <EditsLabel>
                    Offer
                </EditsLabel>
            </OfferEditsHeader>}
            <OfferEditsForm onSubmit={handleSubmit(onSubmit)}>
                <OfferConditionsBlock register={register}/>
                <div className="offer-edits__block">
                    <OfferEditsAcceptButton onClick={() => {
                    }}>Send an offer
                    </OfferEditsAcceptButton>
                </div>
            </OfferEditsForm>
        </OfferEdits>
    </ControlEdits>
};
