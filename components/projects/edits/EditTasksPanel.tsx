import React from 'react';
import {TaskType} from "../../../src/types/projectTypes";
import {EditTasksList} from "./EditTasksList";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {AppStateType} from "../../../src/redux/store-redux";
import {ValidOfferType} from "./Edit";
import {TaskEditsButton} from "../../styled/buttons/revisionButtons/RevisionsButtons";
import {
    EditsLabel,
    FormEditLabel,
    FormEditWrapper,
    TaskEdits, TaskEditsArrow,
    TaskEditsCorrectionButton, TaskEditsHeader,
    TaskEditsInner
} from "../../styled/edit/components";

export interface TaskTypeWithFlag extends TaskType {
    isEdit: boolean
}

export const EditTasksPanel: React.FC<{ type: "addNewEdit" | "changeEdit", projectTasks?: TaskType[] }> = ({
                                                                                                               type,
                                                                                                               projectTasks
                                                                                                           }) => {

    const dispatch = useDispatch()
    const {register, errors, handleSubmit} = useForm()
    const stateTasks = useSelector((state: AppStateType) => state.projects.tasks)
    const [tasks, setTasks] = React.useState<TaskTypeWithFlag[] | null>(null)

    const [isTasksShow, setIsTasksShow] = React.useState(false)

    React.useEffect(() => {
        return () => {
            dispatch(actionsProjects.setTasks(null))
        }
    }, [])

    React.useEffect(() => {
        if (projectTasks) {
            let tasks = projectTasks.map(item => ({...item, isEdit: false}))
            setTasks(tasks)
        } else if (stateTasks) {
            setTasks(stateTasks)
        }
    }, [projectTasks, stateTasks])

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
    return <>
        {
            type === "addNewEdit" ? <>
                    <FormEditWrapper>
                        <FormEditLabel>
                            Edit Task’s
                        </FormEditLabel>
                        <EditTasksList deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                                       register={register}/>
                    </FormEditWrapper>
                    <TaskEditsInner className="task-edits__inner">
                        <TaskEditsButton onClick={addTask}/>
                        <TaskEditsCorrectionButton type={"submit"}>Add correction to project
                        </TaskEditsCorrectionButton>
                    </TaskEditsInner>
                </>
                : type === "changeEdit" &&
                <TaskEdits className={isTasksShow ? "task-edits-open" : "task-edits-closed"}>
                <TaskEditsHeader>
                    <EditsLabel>
                        Edit Task’s
                    </EditsLabel>
                    <TaskEditsArrow onClick={toggleTasksShowMode} className="task-edits__arrow">
                        <svg width={10} height={7} viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="#888BA0" strokeWidth={2}/>
                        </svg>
                    </TaskEditsArrow>
                </TaskEditsHeader>
                <EditTasksList deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                               register={register}/>
                <TaskEditsInner className="task-edits__inner">
                    <TaskEditsButton onClick={addTask}>Add new task <span>+</span></TaskEditsButton>
                </TaskEditsInner>
            </TaskEdits>
        }

    </>


};

