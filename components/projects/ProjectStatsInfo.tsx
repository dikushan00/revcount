import React from "react";
import {ProjectType} from "../../src/types/projectTypes";


export const ProjectStatsInfo:React.FC<{project: ProjectType}> = ({project}) => {

    return <ul className="projects__list projects-list">
        {
            data.map((item, index) => {
                return <li key={index} className={"projects-list__item projects-list__item--" + item.className}>
                    <div className="projects-list__icon">
                        <picture>
                            <source srcSet={item.imgPath} type="image/webp"/>
                            <img src={item.imgPath} alt="flame"/>
                        </picture>
                    </div>
                    <div className="projects-list__body">
                        <div className="projects-list__label">
                            {item.title}
                        </div>
                        <div className="projects-list__metrics">
                            {/*@ts-ignore*/}
                            {project[item.field]} d. {item.addInfo && item.addInfo(project.addDeadline)}
                        </div>
                    </div>
                    {
                        item.addContent && item.addContent
                    }
                </li>
            })
        }
    </ul>
}

const addInfo = (info: string | number) => <sup>+{info} d.</sup>

const data = [
    {
        imgPath: "/img/projects/flame.svg",
        title: "Deadline",
        className: "deadline",
        field: "deadline",
        addInfo: addInfo,
    },
    {
        imgPath: "/img/projects/free.svg",
        title: "Free edits",
        field: "freeEdits",
        className: "edits",
    },
    {
        imgPath: "/img/projects/credit-card.svg",
        title: "Balance",
        field: "balance",
        className: "balance",
        addContent: <div className="projects-list__add">+</div>,
    },
]
