import * as React from "react";
import {useForm} from "react-hook-form";
import {EditStatusType, EditType, TaskType} from "../../../src/types/projectTypes";
import {MainLayOut} from "../../../components/layouts/MainLayOut";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {EditTasksPanel} from "../../../components/projects/Edits/EditTasksPanel";
import {getActiveProject, getTasks} from "../../../src/redux/projects-selector";


export const defaultFirstStatus = {
    id: 1,
    name: "Approval",
    key: "approval",
    isAccepted: false
} as EditStatusType

export default function AddNewEdit() {

    const router = useRouter()
    const {projectId} = router.query
    const dispatch = useDispatch()

    const {register, handleSubmit, watch} = useForm()
    const project = useSelector(getActiveProject)
    const tasks = useSelector(getTasks)

    const onSubmit = (obj: any) => {
        let editPost: EditType = {
            name: watch("name"),
            tasks: [],
            status: "Approval",
            next_action: "",
            description: ""
        }
        tasks.forEach(item => {
            let task: TaskType = {
                id: item.id,
                description: "",
                name: "",
                files: []
            }
            for (let key in obj) {
                let splitKey = key.split("_")

                let fieldName = splitKey[0]
                let taskId = +splitKey[1]

                if (taskId === task.id) {
                    if (fieldName === "description") {
                        task.description = obj[key]
                    } else if (key === "name") {
                        editPost.name = obj[key]
                    } else {
                        if (obj[key].length > 0) {
                            for (let i in obj[key]) {
                                if (i !== "length")
                                    typeof obj[key][i] !== "function" && task.files?.push(obj[key][i])
                            }
                        }

                    }
                }
            }
            editPost?.tasks?.push(task)
        })

        projectId && ProjectAPI.createRevision(+projectId, editPost).then(res => {
            dispatch(actionsProjects.addEditToProject(+projectId, res))
            router.push("/projects/" + projectId)
        })
    }

    if (project?.role?.name !== "Owner")
        return router.push("/")

    return <MainLayOut title={"Add edit"}>
        <section className="edit">
            <div className="edit__header">
                <h2 className="edit__title title">
                    Add new edit
                </h2>
                <button onClick={() => router.push("/projects/" + projectId)} className="edit__btn btn-2">
                    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.8334 7.83327H3.52508L7.59175 11.8999C7.91675 12.2249 7.91675 12.7583 7.59175 13.0833C7.26675 13.4083 6.74175 13.4083 6.41675 13.0833L0.925081 7.5916C0.60008 7.2666 0.60008 6.7416 0.925081 6.4166L6.40841 0.916602C6.73341 0.591602 7.25841 0.591602 7.58341 0.916602C7.90841 1.2416 7.90841 1.7666 7.58341 2.0916L3.52508 6.1666H12.8334C13.2917 6.1666 13.6667 6.5416 13.6667 6.99994C13.6667 7.45827 13.2917 7.83327 12.8334 7.83327Z"
                            fill="#1078F1"/>
                    </svg>
                    Back to project
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="edit__form border-wrap form-edit">
                <div className="form-edit__header">
                    <h4 className="form-edit__label">
                        Edit name
                    </h4>
                    <div className="form-edit__box">
                        <input ref={register} className="form-edit__input" type="text" name="name"
                               placeholder="Write name here"/>
                    </div>
                </div>
                <EditTasksPanel type={"addNewEdit"}/>
            </form>
        </section>
    </MainLayOut>
}