import React from 'react';
import {TaskType} from "../../../src/types/projectTypes";
import {EditTasksList} from "./EditTasksList";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {AppStateType} from "../../../src/redux/store-redux";
import {ValidOfferType} from "./Edit";

export interface TaskTypeWithFlag extends TaskType {
    isEdit: boolean
}

export const EditTasksPanel: React.FC<{ type: "addNewEdit" | "changeEdit", projectTasks?: TaskType[]}> = ({
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
                    <div className="form-edit__wrapper">
                        <h4 className="form-edit__label">
                            Edit Task’s
                        </h4>
                        <EditTasksList deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                                       register={register}/>
                    </div>
                    <div className="task-edits__inner">
                        <AddNewTaskButton addTask={addTask}/>
                        <button type={"submit"} className="task-edits__btn-correction btn">Add correction to project
                        </button>
                    </div>
                </>
                : type === "changeEdit" && <div className={"edits__task task-edits border-wrap " + (isTasksShow ? "task-edits-open" : "task-edits-closed")}>
                <div className="task-edits__header">
                    <div className="task-edits__label label">
                        Edit Task’s
                    </div>
                    <span onClick={toggleTasksShowMode} className="task-edits__arrow">
                        <svg width={10} height={7} viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="#888BA0" strokeWidth={2}/>
                        </svg>
                    </span>
                </div>
                <EditTasksList deleteTask={deleteTask} tasks={tasks} enableEditMode={enableEditMode}
                               register={register}/>
                <div className="task-edits__inner">
                    <AddNewTaskButton addTask={addTask}/>
                </div>
            </div>
        }

    </>


};

const AddNewTaskButton: React.FC<{ addTask: () => void }> = ({addTask}) => {
    return <div onClick={addTask} className="task-edits__btn btn-2">Add new task <span>+</span></div>
}

