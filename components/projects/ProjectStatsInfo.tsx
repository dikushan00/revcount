import React from "react";
import {ProjectType} from "../../src/types/projectTypes";
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
            field: "deadline",
            addInfo: addInfo,
            addContent: null
        },
        {
            imgPath: "/img/projects/free.svg",
            title: "Free edits",
            field: "freeEdits",
            className: "edits",
            addContent: null
        },
    ] as any[]

    if (project?.role?.name === "Owner")
        data.push(
            {
                imgPath: "/img/projects/credit-card.svg",
                title: "Balance",
                field: "balance",
                className: "balance",
                addContent: <div className="projects-list__add">+</div>,
            })

    return <ProjectsList>
        {
            data.map((item, index) => {
                //@ts-ignore
                let timeLeft = project && project[item.field] && calculateDaysLeft(project[item.field] || 0)
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
                            {project ? timeLeft?.days : "-"} d. {item.addInfo && project?.addDeadline && item.addInfo(project?.addDeadline)}
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
