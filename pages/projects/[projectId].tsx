import React from 'react';
import Link from "next/link"
import {EditType, ProjectType, StatusesNamesType} from "../../src/types/projectTypes"
import {ProjectStatsInfo} from "../../components/projects/ProjectStatsInfo";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects, getProjectUsers} from "../../src/redux/projects-reducer";
import {useRouter} from "next/router";
import {getActiveProject} from "../../src/redux/projects-selector";
import {MyCorrectionsButton, ProjectsButton} from "../../components/styled/buttons/Buttons";
import {
    MyCorrections,
    MyCorrectionsAction,
    MyCorrectionsBox,
    MyCorrectionsDesc,
    MyCorrectionsEdit,
    MyCorrectionsIcon,
    MyCorrectionsItem,
    MyCorrectionsList,
    MyCorrectionsTitle,
    ProjectsHeader
} from "../../components/styled/projects/components";
import {Layout} from "../../components/layouts/Layout";
import {AppStateType} from "../../src/redux/store-redux";
import {ProjectAPI} from "../../src/api/ProjectAPI";

const Project: React.FC<{ project: ProjectType }> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {projectId} = router.query

    const project = useSelector(getActiveProject)
    const revisions = useSelector((state: AppStateType) => state.projects.revisions)

    React.useEffect(() => {
        if (projectId) {
            project?.project_id !== +projectId && ProjectAPI.getProject(+projectId).then(response => {
                if (response) {
                    dispatch(actionsProjects.setActiveProject({...response, role: {id: 1, name: "Owner"}}))
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }, [projectId, project])

    React.useEffect(() => {
        if (projectId && revisions.revisionsList.length === 0 && revisions.projectId !== +projectId) {
            ProjectAPI.getRevisions(+projectId).then(response => {
                if (response) {
                    dispatch(actionsProjects.setRevisions(+projectId, response))
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }, [projectId, revisions])

    React.useEffect(() => {
        project && !project.users && dispatch(getProjectUsers(+project.project_id))
    }, [project])

    React.useEffect(() => {
        project && dispatch(actionsProjects.setActiveProject(project))
    }, [project])

    const setEditMode = (edit: EditType | null) => {
        router.push(`${projectId}/revisions/${edit?.revision_id}`)
    }

    return <Layout title={"Project"}>
        <>
            <div className="projects">
                <ProjectsHeader>
                    {project?.role?.name === "Owner" && <AddCorrectionLink projectId={projectId as string}/>}
                    <ProjectStatsInfo project={project}/>
                </ProjectsHeader>
            </div>
            <MyCorrections>
                <MyCorrectionsTitle>
                    My corrections
                </MyCorrectionsTitle>
            </MyCorrections>
            <MyCorrectionsList>
                {
                    revisions?.revisionsList?.map(edit => {
                        const statusImgPath = getStatusImg(edit.status)
                        return <MyCorrectionsItem key={edit.revision_id}>
                            <MyCorrectionsEdit onClick={() => setEditMode(edit)}>
                                <span/>{edit.name}
                            </MyCorrectionsEdit>
                            <MyCorrectionsBox>
                                <MyCorrectionsIcon>
                                    <picture>
                                        <source srcSet={statusImgPath} type="image/webp"/>
                                        <img src={statusImgPath} alt="loading"/>
                                    </picture>
                                </MyCorrectionsIcon>
                                <MyCorrectionsAction>
                                    {edit.status}
                                </MyCorrectionsAction>
                            </MyCorrectionsBox>
                            <MyCorrectionsDesc>
                                {edit.next_action || edit.description}
                            </MyCorrectionsDesc>
                            <MyCorrectionsButton className="my-corrections__btn btn-2"
                                                 onClick={() => setEditMode(edit)}>see
                                Detail
                            </MyCorrectionsButton>
                        </MyCorrectionsItem>
                    })
                }
            </MyCorrectionsList>
        </>
    </Layout>

}

const AddCorrectionLink: React.FC<{ projectId: string }> = ({projectId}) => <Link
    href={"/projects/add-new-edit/" + projectId}>
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