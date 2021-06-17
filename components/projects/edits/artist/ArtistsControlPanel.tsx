import React from 'react';
import {OfferConditionsBlock} from "../EditControlPanel";
import {useForm} from "react-hook-form";
import {ProjectAPI} from "../../../../src/api/ProjectAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../src/redux/store-redux";
import {actionsProjects} from "../../../../src/redux/projects-reducer";
import {RoleType} from "../../../../src/types/userTypes";
import {getActiveProject} from "../../../../src/redux/projects-selector";

export const ArtistsControlPanel: React.FC<{ projectId: number, editId: number | undefined, role: RoleType }> = ({role, projectId, editId}) => {

    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm()

    const project = useSelector(getActiveProject)

    const onSubmit = (data: { days: string, hours: string, balance: string }) => {
        let edits = project?.revisions?.map(item => {
            if (item.revision_id === editId)
                return {...item, offer: {days: +data.days, balance: +data.balance, hours: +data.hours}}
            return item
        })
        //@ts-ignore
        edits && ProjectAPI.sendOffer(projectId, {...project, edits}, data).then(res => {
            !res?.error && dispatch(actionsProjects.setActiveProject(res))
        })
    }

    return <div className="edits__control border-wrap control-edits">
        <div className="control-edits__offer offer-edits">
            {role.name !== "Artist" && <div className="offer-edits__header">
                <div className="offer-edits__label label">
                    Offer
                </div>
            </div>}
            <form onSubmit={handleSubmit(onSubmit)} className="offer-edits__form" action="#">
                <OfferConditionsBlock register={register}/>
                <div className="offer-edits__block">
                    <div onClick={() => {
                    }} className="offer-edits__btn-accept">Send an offer
                    </div>
                </div>
            </form>
        </div>
    </div>
};
