import React from 'react';
import {useSelector} from "react-redux";
import {EditStatusType, EditType, StatusesNamesType} from "../../../src/types/projectTypes";
import {getStatuses} from "../../../src/redux/projects-selector";
import {ProgressEditButton} from "../../styled/buttons/revisionButtons/RevisionsButtons";
import {
    ProgressEdits,
    ProgressEditsItem,
    ProgressEditsLabel,
    ProgressEditsList,
    ProgressEditsWrapper
} from "../../styled/edit/components";

interface EditStatusProgressType extends EditStatusType {
    touched?: boolean
    isCurrent?: boolean
}

export const EditProgressBar: React.FC<{ revision: EditType | null  }> = ({revision}) => {

    const statuses = useSelector(getStatuses)
    const [validStatuses, setValidStatuses] = React.useState([] as EditStatusProgressType[])

    React.useEffect(() => {
        if (statuses && revision) {
            let currentStatusIndex = statuses.findIndex(status => status.name === revision.status)
            let edited = statuses.map((item, index) => {
                if (index < currentStatusIndex)
                    return {...item, touched: true, isAccepted: true}
                if (index === currentStatusIndex)
                    return {name: item.name, touched: true, isCurrent: true}
                return {...item, touched: false, isAccepted: false}
            })
            setValidStatuses(edited)
        }
    }, [statuses, revision])

    return <ProgressEdits>
        <ProgressEditsWrapper>
            <ProgressEditsLabel>
                Progress:
            </ProgressEditsLabel>
            <ProgressEditsList>
                {
                    validStatuses?.map((item, index) => {
                        let className: "btn-border" | "btn-blue" | "btn-green" | "" = ""
                        if (item.touched)
                            className = "btn-border"
                        if (item.isAccepted) {
                            className = "btn-blue"
                        }
                        if (item.name === "Editing is done" && item?.isCurrent) {
                            className = "btn-green"
                        }
                        return <ProgressEditsItem key={index}>
                            <ProgressEditButton className={"progress-edits__btn progress-edits__btn--" + item.key + " " + className}>
                                {item.name}
                            </ProgressEditButton>
                        </ProgressEditsItem>
                    })
                }
            </ProgressEditsList>
        </ProgressEditsWrapper>
    </ProgressEdits>
}
