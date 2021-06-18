import React from 'react';
import {WorkspaceMessageType} from "../../../src/types/projectTypes";
import {
    LeftWorkspace, LeftWorkspaceDesc,
    LeftWorkspaceInput,
    LeftWorkspaceItem,
    LeftWorkspaceLabel,
    LeftWorkspaceList
} from "../../styled/edit/components";

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
    return <LeftWorkspace>
        <LeftWorkspaceLabel>Left:</LeftWorkspaceLabel>
        <LeftWorkspaceList>
            <LeftWorkspaceItem>
                <LeftWorkspaceInput type="text" placeholder={timeLeft.days || "0"}/>
                <LeftWorkspaceDesc>d.</LeftWorkspaceDesc>
            </LeftWorkspaceItem>
            <LeftWorkspaceItem>
                <LeftWorkspaceInput type="text" placeholder={timeLeft.minutes || "0"}/>
                <LeftWorkspaceDesc>m.</LeftWorkspaceDesc>
            </LeftWorkspaceItem>
            <LeftWorkspaceItem>
                <LeftWorkspaceInput type="text" placeholder={timeLeft.seconds || "0"}/>
                <LeftWorkspaceDesc>s.</LeftWorkspaceDesc>
            </LeftWorkspaceItem>
        </LeftWorkspaceList>
    </LeftWorkspace>
}
