import React from 'react';
import {EditType, InviteStatusType, OfferType} from "../../../src/types/projectTypes";
import {EditProgressBar} from "./EditProgressBar";
import {EditTasksPanel} from "./EditTasksPanel";
import {EditWorkspaceWindow} from "./EditWorkspaceWindow";
import {EditControlPanel} from "./EditControlPanel";
import {useSelector} from "react-redux";
import {ArtistsControlPanel} from "./artist/ArtistsControlPanel";
import {getActiveProject} from "../../../src/redux/projects-selector";
import {calculateDaysLeft} from "../../../src/utils/calculateDaysLeft";
import {useHttp} from "../../../src/utils/hooks/http.hook";
import {Edits, EditsButton, EditsHeader, EditsTitle} from "../../styled/edit/components";

export const Edit: React.FC<{ edit: EditType | null, closePage: () => void }> = ({edit, closePage}) => {

    const project = useSelector(getActiveProject)
    const {request, error} = useHttp()

    const [offer, setOffer] = React.useState<ValidOfferType | null>(null)

    React.useEffect(() => {
        const getOffer = async () => {
            if (project?.project_id && edit?.revision_id) {
                let offer = await request<OfferType>(`revisions/${edit.revision_id}/offer`)
                if (offer) {
                    let timeLeft = calculateDaysLeft(offer.deadline)
                    let offerObj = {
                        days: timeLeft.days,
                        hours: timeLeft.hours,
                        status: offer.status,
                        amount: offer.amount,
                        deadline: offer.deadline
                    }
                    setOffer(offerObj)
                }
            }
        }
        getOffer()
    }, [project, edit])

    return <Edits>
        <EditsHeader>
            <EditsTitle>
                Edits Pack #{edit?.revision_id}
            </EditsTitle>
            <EditsButton onClick={closePage}>
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.8334 7.83327H3.52508L7.59175 11.8999C7.91675 12.2249 7.91675 12.7583 7.59175 13.0833C7.26675 13.4083 6.74175 13.4083 6.41675 13.0833L0.925081 7.5916C0.60008 7.2666 0.60008 6.7416 0.925081 6.4166L6.40841 0.916602C6.73341 0.591602 7.25841 0.591602 7.58341 0.916602C7.90841 1.2416 7.90841 1.7666 7.58341 2.0916L3.52508 6.1666H12.8334C13.2917 6.1666 13.6667 6.5416 13.6667 6.99994C13.6667 7.45827 13.2917 7.83327 12.8334 7.83327Z"
                        fill="#1078F1"/>
                </svg>
                Back to project
            </EditsButton>
        </EditsHeader>
        <EditProgressBar status={edit?.status}/>
        <EditTasksPanel type={"changeEdit"}/>
        <EditWorkspaceWindow isOfferExist = {!!offer} offer = {offer} isOwner={project?.role?.name === "Owner"}
                             workspace={edit?.workspace} deadline={offer?.deadline}/>
        {
            project?.role?.name === "Owner"
                ? <EditControlPanel offer={offer} closePage={closePage} project={project} edit={edit}/>
                : project?.role?.name === "Artist" && edit?.status === "Approval" && !offer &&
                <ArtistsControlPanel revisionId={edit?.revision_id} projectId={project.project_id} role={project.role}/>
        }
    </Edits>
};

export type ValidOfferType = { amount: number, days: number, hours: number, deadline: string, status: InviteStatusType }