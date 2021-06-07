import React from 'react';
import Link from "next/link"
import {MainLayOut} from "../../components/layouts/MainLayOut";
import {ProjectsButton} from "../../components/common/blocks/buttons/ProjectsButton";
import {ProjectAPI} from "../../src/api/ProjectAPI";
import {ProjectType, StatusesNamesType} from "../../src/types/projectTypes"
import {ProjectStatsInfo} from "../../components/projects/ProjectStatsInfo";
import {useDispatch} from "react-redux";
import {actionsProjects} from "../../src/redux/projects-reducer";

const Project: React.FC<{ project: ProjectType }> = ({project}) => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        project && dispatch(actionsProjects.setActiveProject(project))

        return () => {
            project && dispatch(actionsProjects.setActiveProject(null))
        }
    }, [project])
    return <MainLayOut title={"Project"}>
        <div className="projects">
            <div className="projects__header">
                <Link href="/add-new-edit">
                    <a>
                        <ProjectsButton>Add new correction<span>+</span></ProjectsButton>
                    </a>
                </Link>
                <ProjectStatsInfo project={project}/>
            </div>
        </div>
        <div className="my-corrections">
            <h2 className="my-corrections__title title">
                My corrections
            </h2>
        </div>
        <ul className="my-corrections__list">
            {
                project.edits?.map(edit => {
                    const statusImgPath = getStatusImg(edit.status?.name)
                    return <li key={edit.id} className="my-corrections__item">
                        <div className="my-corrections__edit">
                            <span/>{edit.name}
                        </div>
                        <div className="my-corrections__box">
                            <div className="my-corrections__icon">
                                <picture>
                                    <source srcSet={statusImgPath} type="image/webp"/>
                                    <img src={statusImgPath} alt="loading"/></picture>
                            </div>
                            <div className="my-corrections__action">
                                {edit.status.name}
                            </div>
                        </div>
                        <div className="my-corrections__descr">
                            {edit.description}
                        </div>
                        <button className="my-corrections__btn btn-2">see Detail</button>
                    </li>
                })
            }
        </ul>
    </MainLayOut>

}

const getStatusImg = (status: StatusesNamesType) => {
    switch (status) {
        case "Approval": {
            return "/img/projects/loading.svg"
        }
        case "Reservation": {
            return "/img/projects/piggy-bank.svg"
        }
        case "Performing": {
            return "/img/projects/speedometer.svg"
        }
        case "Editing is done": {
            return "/img/projects/flag.svg"
        }
    }
}

export async function getStaticPaths() {

    let projects = await ProjectAPI.getProjects()
    const paths = await projects?.map((p: any) => `/projects/${p.id}`)
    return {paths, fallback: false}
}

export const getStaticProps = async ({params}: { params: { id: number } }) => {
    let project = await ProjectAPI.getProject(params.id)

    return {props: {project}}
}

export default Project