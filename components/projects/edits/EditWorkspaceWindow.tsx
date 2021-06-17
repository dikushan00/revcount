import React from 'react';
import {WorkspaceMessageType} from "../../../src/types/projectTypes";

type TimeLeftType = {
    days: string | null,
    minutes: string | null,
    seconds: string | null
}

export const EditWorkspaceWindow: React.FC<{ isOwner: boolean, isOfferExist: boolean, workspace: WorkspaceMessageType[] | undefined, deadline: string | null | undefined }> =
    ({workspace, deadline, isOwner, isOfferExist}) => {
        const [timeLeft, setTimeLeft] = React.useState<TimeLeftType>({
            days: null,
            minutes: null,
            seconds: null
        })

        React.useEffect(() => {
            if (deadline) {
                setTimeLeft({
                    seconds: "55",
                    minutes: "44",
                    days: "4"
                })
            }
        }, [deadline])
        return <div className="edits__workspace workspace-edits border-wrap">
            <div className="workspace-edits__header">
                <div className="workspace-edits__label label">
                    Workspace
                </div>
                {isOwner && !isOfferExist && <button className="workspace-edits__btn">Waiting for an offer</button>}
            </div>
            {workspace && workspace?.length > 0 && <ul className="workspace-edits__box">
                {
                    workspace.map(item => {
                        return <li key={item.id} className="workspace-edits__item">
                            <p className="workspace-edits__offer">
                                {item.message}
                            </p>
                            <div className="workspace-edits__date">
                                {item.date}
                            </div>
                        </li>
                    })
                }
            </ul>}
            {deadline && <LeftTimeWorkspace timeLeft={timeLeft}/>}
        </div>
    }

const LeftTimeWorkspace: React.FC<{ timeLeft: TimeLeftType }> = ({timeLeft}) => {
    return <form className="workspace-edits__left left-workspace">
        <div className="left-workspace__label">Left:</div>
        <ul className="left-workspace__list">
            <li className="left-workspace__item">
                <input type="text" className="left-workspace__input" placeholder={timeLeft.days || "0"}/>
                <div className="left-workspace__designation">d.</div>
            </li>
            <li className="left-workspace__item">
                <input type="text" className="left-workspace__input" placeholder={timeLeft.minutes || "0"}/>
                <div className="left-workspace__designation">m.</div>
            </li>
            <li className="left-workspace__item">
                <input type="text" className="left-workspace__input" placeholder={timeLeft.seconds || "0"}/>
                <div className="left-workspace__designation">s.</div>
            </li>
        </ul>
    </form>
}
