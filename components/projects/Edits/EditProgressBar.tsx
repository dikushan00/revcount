import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../src/redux/store-redux";
import {EditStatusType, StatusesNamesType} from "../../../src/types/projectTypes";
import {getStatuses} from "../../../src/redux/projects-selector";

interface EditStatusProgressType extends EditStatusType {
    touched?: boolean
    isCurrent?: boolean
}

export const EditProgressBar: React.FC<{ status: StatusesNamesType | undefined }> = ({status: statusProps}) => {

    const statuses = useSelector(getStatuses)
    const [validStatuses, setValidStatuses] = React.useState([] as EditStatusProgressType[])

    React.useEffect(() => {
        if (statuses && statusProps) {
            let currentStatusIndex = statuses.findIndex(status => status.name === statusProps)
            let edited = statuses.map((item, index) => {
                if (index < currentStatusIndex)
                    return {...item, touched: true, isAccepted: true}
                if (index === currentStatusIndex)
                    return {name: statusProps, touched: true, isCurrent: true}
                return {...item, touched: false, isAccepted: false}
            })
            setValidStatuses(edited)
        }
    }, [statuses, statusProps])

    return <div className="edits__progress border-wrap progress-edits">
        <div className="progress-edits__wrapper">
            <div className="progress-edits__label label">
                Progress:
            </div>
            <ul className="progress-edits__list">
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
                        return <li key={index} className="progress-edits__item">
                            <button
                                className={"progress-edits__btn progress-edits__btn--" + item.key + "btn-4 " + className}>{item.name}
                            </button>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
}
