import React from 'react';
import Link from "next/link"
import {MainLayOut} from "../../components/layouts/MainLayOut";
import {ProjectsButton} from "../../components/common/blocks/buttons/ProjectsButton";
import {ProjectAPI} from "../../src/api/ProjectAPI";
import {EditType, ProjectType, StatusesNamesType} from "../../src/types/projectTypes"
import {ProjectStatsInfo} from "../../components/projects/ProjectStatsInfo";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../src/redux/projects-reducer";
import {Edit} from "../../components/projects/Edits/Edit";
import {useRouter} from "next/router";
import {AppStateType} from "../../src/redux/store-redux";
import {getActiveEdit, getActiveProject} from "../../src/redux/projects-selector";

const Project: React.FC<{ project: ProjectType }> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {projectId} = router.query

    const project = useSelector(getActiveProject)
    const activeEdit = useSelector(getActiveEdit)

    React.useEffect(() => {
        if (projectId ) {
            !project && ProjectAPI.getProject(+projectId).then(res => {
                !res?.error && dispatch(actionsProjects.setActiveProject(res))
            })
           ProjectAPI.getRevisions(+projectId).then(res => {
                dispatch(actionsProjects.addRevisionsToProject(res, +projectId))
            })
        }
    }, [projectId])

    React.useEffect(() => {
        project && dispatch(actionsProjects.setActiveProject(project))
    }, [project])

    const handleDisableEditMode = () => dispatch(actionsProjects.setActiveEdit(null))
    const setEditMode = (edit: EditType | null) => {
        dispatch(actionsProjects.setActiveEdit(edit))
    }

    return <MainLayOut title={"Project"}>
        {
            activeEdit
                ? <Edit closePage={handleDisableEditMode} edit={activeEdit}/>
                : <>
                    <div className="projects">
                        <div className="projects__header">
                            {project?.role?.name === "Owner" && <AddCorrectionLink projectId={projectId as string}/>}
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
                            project?.revisions?.map(edit => {
                                const statusImgPath = getStatusImg(edit.status)
                                return <li key={edit.revision_id} className="my-corrections__item">
                                    <div className="my-corrections__edit" onClick={() => setEditMode(edit)}>
                                        <span/>{edit.name}
                                    </div>
                                    <div className="my-corrections__box">
                                        <div className="my-corrections__icon">
                                            <picture>
                                                <source srcSet={statusImgPath} type="image/webp"/>
                                                <img src={statusImgPath} alt="loading"/></picture>
                                        </div>
                                        <div className="my-corrections__action">
                                            {edit.status}
                                        </div>
                                    </div>
                                    <div className="my-corrections__descr">
                                        {edit.description}
                                    </div>
                                    <button className="my-corrections__btn btn-2" onClick={() => setEditMode(edit)}>see
                                        Detail
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                </>
        }
    </MainLayOut>

}

const AddCorrectionLink: React.FC<{projectId: string }> = ({projectId}) => <Link href={"/projects/add-new-edit/" + projectId}>
    <a className={"next_link_tag"}>
        <ProjectsButton>Add new correction<span>+</span></ProjectsButton>
    </a>
</Link>

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

export default Project