import React from 'react';
import Link from "next/link"
import {MainLayOut} from "../../components/layouts/MainLayOut";
import {EditType, ProjectType, StatusesNamesType} from "../../src/types/projectTypes"
import {ProjectStatsInfo} from "../../components/projects/ProjectStatsInfo";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../src/redux/projects-reducer";
import {Edit} from "../../components/projects/edits/Edit";
import {useRouter} from "next/router";
import {getActiveEdit, getActiveProject} from "../../src/redux/projects-selector";
import {useHttp} from "../../src/utils/hooks/http.hook";
import {MyCorrectionsButton, ProjectsButton} from "../../components/styled/buttons/Buttons";
import {
    MyCorrections, MyCorrectionsBox, MyCorrectionsDesc, MyCorrectionsEdit, MyCorrectionsIcon, MyCorrectionsItem,
    MyCorrectionsList,
    MyCorrectionsTitle,
    ProjectsHeader
} from "../../components/styled/projects/components";
import {MyCorrectionsAction} from "../../components/styled/edit/components";

const Project: React.FC<{ project: ProjectType }> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {request} = useHttp()
    const {projectId} = router.query

    const project = useSelector(getActiveProject)
    const activeEdit = useSelector(getActiveEdit)

    React.useEffect(() => {
        if (projectId) {
            const getData = async () => {
                let project = await request<ProjectType>(`projects/${+projectId}`)
                if (project) {
                    dispatch(actionsProjects.setActiveProject(project))
                }
                let revisions = await request<EditType[]>(`projects/${projectId}/revisions`)
                if (revisions) {
                    dispatch(actionsProjects.addRevisionsToProject(revisions, +projectId))
                }
            }
            getData()
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
                            project?.revisions?.map(edit => {
                                const statusImgPath = getStatusImg(edit.status)
                                return <MyCorrectionsItem key={edit.revision_id}>
                                    <MyCorrectionsEdit onClick={() => setEditMode(edit)}>
                                        <span/>{edit.name}
                                    </MyCorrectionsEdit>
                                    <MyCorrectionsBox >
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
                                        {edit.description}
                                    </MyCorrectionsDesc>
                                    <MyCorrectionsButton className="my-corrections__btn btn-2" onClick={() => setEditMode(edit)}>see
                                        Detail
                                    </MyCorrectionsButton>
                                </MyCorrectionsItem>
                            })
                        }
                    </MyCorrectionsList>
                </>
        }
    </MainLayOut>

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