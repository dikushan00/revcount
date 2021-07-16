import React from "react";
import {ProjectObjKeysType, ProjectType} from "../../src/types/projectTypes";
import {calculateDaysLeft} from "../../src/utils/calculateDaysLeft";
import {
    ProjectsList,
    ProjectsListBody, ProjectsListIcon,
    ProjectsListItem,
    ProjectsListLabel,
    ProjectsListMetrics
} from "../styled/projects/components";

export const ProjectStatsInfo: React.FC<{ project: ProjectType | null }> = ({project}) => {
    const addInfo = (info: string | number) => <sup>+{info} d.</sup>

    const data = [
        {
            imgPath: "/img/projects/flame.svg",
            title: "Deadline",
            className: "deadline",
            field: "deadline" as ProjectObjKeysType,
            unit: "d.",
            addInfo: addInfo,
            addContent: null
        },
        {
            imgPath: "/img/projects/free.svg",
            title: "Free edits",
            field: "included_revisions" as ProjectObjKeysType,
            className: "edits",
            unit: "h.",
            addContent: null
        },
    ] as { imgPath: string, title: string, field: ProjectObjKeysType, className: string, unit: string, addContent: any }[]

    if (project && project?.user_role === "OWNER")
        data.push(
            {
                imgPath: "/img/projects/credit-card.svg",
                title: "Balance",
                field: "balance" as ProjectObjKeysType,
                unit: "$",
                className: "balance",
                addContent: <div className="projects-list__add">+</div>,
            })

    return <ProjectsList>
        {
            data.map((item, index) => {
                let fieldItem: any = project && project[item.field]
                if (fieldItem)
                    switch (item.field) {
                        case "deadline" : {
                            fieldItem = fieldItem && calculateDaysLeft(fieldItem || 0).days
                            break
                        }
                        case "included_revisions" : {
                            let splitIncludeRevisions = fieldItem.toString().split(".")
                            let minutePercent = splitIncludeRevisions[1]
                            if (minutePercent) {
                                minutePercent = minutePercent.slice(0, 2)
                                let percent = +minutePercent * 60 / 100
                                fieldItem = splitIncludeRevisions[0] + "." + percent
                            }
                            break
                        }
                    }
                return <ProjectsListItem key={index} className={item.className}>
                    <ProjectsListIcon>
                        <picture>
                            <source srcSet={item.imgPath} type="image/webp"/>
                            <img src={item.imgPath} alt="flame"/>
                        </picture>
                    </ProjectsListIcon>
                    <ProjectsListBody>
                        <ProjectsListLabel>
                            {item.title}
                        </ProjectsListLabel>
                        <ProjectsListMetrics>
                            {/*@ts-ignore*/}
                            {fieldItem ? `${fieldItem} ${item.unit}` : "-"} {item.addInfo && project?.addDeadline && item.addInfo(project?.addDeadline)}
                        </ProjectsListMetrics>
                    </ProjectsListBody>
                    {
                        item?.addContent && item.addContent
                    }
                </ProjectsListItem>
            })
        }
    </ProjectsList>
}
