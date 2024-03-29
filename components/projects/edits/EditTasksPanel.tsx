import React from 'react';
import {EditType, ProjectRolesType, TaskType} from "../../../src/types/projectTypes";
import {EditTasksList} from "./EditTasksList";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects, defaultTaskObj} from "../../../src/redux/projects-reducer";
import {AppStateType} from "../../../src/redux/store-redux";
import {TaskEditsButton} from "../../styled/buttons/revisionButtons/RevisionsButtons";
import {
    EditsLabel,
    FormEditBox,
    FormEditHeader,
    FormEditInput,
    FormEditLabel,
    FormEditWrapper,
    TaskEdits,
    TaskEditsArrow,
    TaskEditsCorrectionButton,
    TaskEditsHeader,
    TaskEditsInner
} from "../../styled/edit/components";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useHttp} from "../../../src/utils/hooks/http.hook";
import {Toast, useToast} from "../../common/blocks/Toast";
import {ValidationError} from "../../common/form/ValidationError";

export interface TaskTypeWithFlag extends TaskType {
    isEdit: boolean
}

type PropsType = {
    type: "addNewEdit" | "changeEdit",
    projectTasks?: TaskType[],
    control?: any,
    userRole?: ProjectRolesType | undefined,
    projectId?: string | string[] | undefined,
    revisionId?: string | string[] | undefined,
    editName?: string | null
}

export const EditTasksPanel: React.FC<PropsType> = ({
                                                        type,
                                                        control,
                                                        editName,
                                                        userRole,
                                                        revisionId,
                                                        projectId,
                                                        projectTasks
                                                    }) => {

    const {control: changeControl, errors, handleSubmit, watch} = useForm()
    const {request, error, clearError} = useHttp()
    const {show} = useToast()
    const dispatch = useDispatch()
    const router = useRouter()
    const tasks = useSelector((state: AppStateType) => state.projects.tasks)

    const [isTasksShow, setIsTasksShow] = React.useState(true)

    React.useEffect(() => {
        return () => {
            dispatch(actionsProjects.setTasks(null))
        }
    }, [])

    React.useEffect(() => {
        if (projectTasks) {
            let tasks = projectTasks.map((item, index) => {
                if (index === 0)
                    return {...item, isEdit: true}
                return {...item, isEdit: false}
            })
            dispatch(actionsProjects.setTasks(tasks))
        } else {
            dispatch(actionsProjects.setTasks(defaultTaskObj))
        }
    }, [projectTasks])

    const enableEditMode = (taskId: number) => {
        dispatch(actionsProjects.enableEditModeToTask(taskId))
    }

    const deleteTask = (taskId: number) => {
        dispatch(actionsProjects.deleteTask(taskId))
    }
    const addTask = () => {
        dispatch(actionsProjects.addTask())
    }
    const toggleTasksShowMode = () => {
        setIsTasksShow(is => !is)
    }
    const sortTasks = (obj: any) => {
        let editPost: EditType = {
            name: watch("name"),
            tasks: [],
            status: "Approval",
            next_action: "",
            description: ""
        }
        tasks?.forEach(item => {
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
        return editPost
    }
    const onChangeRevisionSubmit = async (obj: any) => {
        let editPost = sortTasks(obj)
        let response = revisionId && await request<EditType>(`revisions/${revisionId}`, "patch", editPost)
        if (response) {
            projectId && dispatch(actionsProjects.addEditToProject(+projectId, response))
            router.push("/projects/" + projectId)
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    return <>
        {
            type === "addNewEdit"
                ? <>
                    <FormEditWrapper>
                        <FormEditLabel>
                            Edit Task’s
                        </FormEditLabel>
                        <EditTasksList deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                                       control={control} errors={errors}/>
                    </FormEditWrapper>
                    <TaskEditsInner className="task-edits__inner">
                        <TaskEditsButton onClick={addTask}>Add new task <span>+</span></TaskEditsButton>
                        <TaskEditsCorrectionButton type={"submit"}>Add correction to project
                        </TaskEditsCorrectionButton>
                    </TaskEditsInner>
                </>
                : type === "changeEdit" &&
                <TaskEdits className={"task-edits " + (isTasksShow ? "task-edits-open" : "task-edits-closed")}>
                    <form className="task-edits" onSubmit={handleSubmit(onChangeRevisionSubmit)}>
                        <FormEditHeader>
                            <EditsLabel>
                                Edit name
                            </EditsLabel>
                            <div style={{marginTop: "calc(15px + 9 * ((100vw - 320px) / 1600))"}}/>
                            <FormEditBox>
                                {editName && <Controller
                                        as={<FormEditInput placeholder="Write name here" type="text"/>}
                                        name="name"
                                        rules={{required: true}}
                                        control={changeControl}
                                        defaultValue={editName}
                                    />}
                                {errors.name && <ValidationError/>}
                            </FormEditBox>
                        </FormEditHeader>
                        <div style={{marginTop: "13px"}}/>
                        <TaskEditsHeader>
                            <EditsLabel>
                                Edit Task’s
                            </EditsLabel>
                            <TaskEditsArrow onClick={toggleTasksShowMode} className="task-edits__arrow">
                                <svg width={10} height={7} viewBox="0 0 10 7" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#888BA0" strokeWidth={2}/>
                                </svg>
                            </TaskEditsArrow>
                        </TaskEditsHeader>
                        <EditTasksList errors={errors} deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                                       control={changeControl}/>
                        { userRole === "OWNER" && <TaskEditsInner className="task-edits__inner">
                            <TaskEditsButton onClick={addTask}>Add new task <span>+</span></TaskEditsButton>
                            <TaskEditsCorrectionButton type={"submit"}>Save correction</TaskEditsCorrectionButton>
                        </TaskEditsInner>}
                    </form>
                </TaskEdits>
        }
        <Toast/>
    </>
};

