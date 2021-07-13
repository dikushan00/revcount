import React from 'react';
import {EditType, InviteStatusType, OfferType} from "../../../../src/types/projectTypes";
import {useDispatch, useSelector} from "react-redux";
import {getActiveProject, getProjects} from "../../../../src/redux/projects-selector";
import {useHttp} from "../../../../src/utils/hooks/http.hook";
import {calculateDaysLeft} from "../../../../src/utils/calculateDaysLeft";
import {Edits, EditsButton, EditsHeader, EditsTitle} from "../../../../components/styled/edit/components";
import {EditProgressBar} from "../../../../components/projects/edits/EditProgressBar";
import {EditTasksPanel} from "../../../../components/projects/edits/EditTasksPanel";
import {EditWorkspaceWindow} from "../../../../components/projects/edits/EditWorkspaceWindow";
import {EditControlPanel} from "../../../../components/projects/edits/EditControlPanel";
import {ArtistsControlPanel} from "../../../../components/projects/edits/artist/ArtistsControlPanel";
import {MainLayOut} from "../../../../components/layouts/MainLayOut";
import {useRouter} from "next/router";
import {actionsProjects} from "../../../../src/redux/projects-reducer";
import {ProjectAPI} from "../../../../src/api/ProjectAPI";

const Edit: React.FC<{ edit: EditType | null, closePage: () => void }> = () => {

    const project = useSelector(getActiveProject)
    const projects = useSelector(getProjects)
    const {request} = useHttp()
    const router = useRouter()
    const dispatch = useDispatch()

    const {projectId, revisionId} = router.query

    const [offer, setOffer] = React.useState<ValidOfferType | null>(null)
    const [revision, setRevision] = React.useState<EditType | null>(null)

    React.useEffect(() => {
        if (projectId && revisionId) {
            ProjectAPI.getRevisions(+projectId).then(response => {
                if (response) {
                    dispatch(actionsProjects.setRevisions(+projectId, response))
                    let revision = response?.find((item: any) => item.revision_id === +revisionId)
                    revision && setRevision({...revision, isOfferAccepted: false})
                }
            }).catch(e => {
                dispatch(actionsProjects.setRevisions(null, null))
            })
        }
    }, [projectId, revisionId])

    React.useEffect(() => {
        revision?.revision_id && ProjectAPI.getRevisionWorkspace(revision.revision_id).then(res => {
            //@ts-ignore
            workspace && setRevision(state => ({...state, res}))
        }).catch(e => {
        })
    }, [revision])

    React.useEffect(() => {
        let activeProject = projects && projectId && projects.find(item => item.project_id === +projectId)
        activeProject && dispatch(actionsProjects.setActiveProject(activeProject))
    }, [projects])

    React.useEffect(() => {
        if (offer?.status === "ACCEPTED") {
            //@ts-ignore
            setRevision(prevState => ({...prevState, isOfferAccepted: true}))
            setRevision((prevState) => {
                if (prevState && prevState.status === "Approval") {
                    return {...prevState, status: "Reservation"}
                }
                return prevState
            })
        }
    }, [offer])

    React.useEffect(() => {
        const getOffer = async () => {
            let offer = revisionId && await request<OfferType>(`revisions/${revisionId}/offer`)
            if (offer) {
                let timeLeft = calculateDaysLeft(offer.deadline)
                let offerObj = {
                    offerId: offer.offer_id,
                    days: timeLeft.days,
                    hours: timeLeft.hours,
                    status: offer.status,
                    amount: offer.amount,
                    deadline: offer.deadline
                }
                offerObj && setOffer(offerObj)
            }
        }
        getOffer()
    }, [])

    const closePage = () => {
        router.push(`/projects/${projectId}`)
    }

    return <MainLayOut title={"Revisions"}>
        <Edits>
            <EditsHeader>
                <EditsTitle>
                    Edits Pack #{revision?.revision_id}
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
            <EditProgressBar revision={revision}/>
            <EditTasksPanel editName={revision?.name} projectId={projectId} projectTasks={revision?.tasks}
                            type={"changeEdit"}/>
            <EditWorkspaceWindow isOfferExist={!!offer} offer={offer} isOwner={project?.user_role === "OWNER"}
                                 workspace={revision?.workspace} deadline={offer?.deadline}/>
            {
                project?.user_role === "OWNER"
                    ? <EditControlPanel setOffer={setOffer} closePage={closePage} offer={offer} project={project}
                                        edit={revision}/>
                    : project?.user_role === "ARTIST" && revision?.status === "Approval" && !offer &&
                    <ArtistsControlPanel setOffer={setOffer} revisionId={revision?.revision_id}/>
            }
        </Edits>
    </MainLayOut>
};

export default Edit
export type ValidOfferType = { offerId: number, amount: number, days: number | null, hours: number | null, deadline: string, status: InviteStatusType }