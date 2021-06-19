import React from 'react';
import {TaskTypeWithFlag} from "./EditTasksPanel";
import {
    TaskEditsBlock, TaskEditsBody, TaskEditsBox, TaskEditsDelete, TaskEditsEdit, TaskEditsFile, TaskEditsFileIcon,
    TaskEditsItem,
    TaskEditsList,
    TaskEditsNumber, TaskEditsTextarea,
    TaskEditsTop, TaskEditsWrap, TaskEditsWrapper
} from "../../styled/edit/components";
import {ImgWrapper} from "../../common/blocks/ImgWrapper";

type PropsType = {
    register: any
    tasks: TaskTypeWithFlag[] | null
    enableEditMode: (id: number) => void
    deleteTask: (id: number) => void
}

export const EditTasksList: React.FC<PropsType> = ({register, tasks, enableEditMode, deleteTask}) => {
    return <TaskEditsList className="task-edits__list">
        {
            tasks?.map(task => {
                return <TaskEditsItem key={task.id}
                                      className={"task-edits__item " + (task.isEdit ? "task-open" : "")}>
                    <TaskEditsTop className={"task-edits__top"}>
                        <TaskEditsNumber className="task-edits__number"/>
                        {task.isEdit && <EditBox registerRef={register} taskId={task.id}/>}
                        <TaskEditsBlock className="task-edits__block">
                            <TaskEditsEdit onClick={() => enableEditMode(task.id)}
                                           className="task-edits__edit">Edit
                            </TaskEditsEdit>
                            <TaskEditsDelete onClick={() => deleteTask(task.id)}
                                             className="task-edits__delete">Delete
                            </TaskEditsDelete>
                        </TaskEditsBlock>
                    </TaskEditsTop>
                    <TaskEditsBody className="task-edits__body">
                        <TaskEditsTextarea ref={register} name={"description_" + task.id}
                                           placeholder="Describe the task clearly..." defaultValue={""}/>
                    </TaskEditsBody>
                </TaskEditsItem>
            })
        }
    </TaskEditsList>
};

const EditBox: React.FC<{ taskId: number, registerRef: any }> = ({taskId, registerRef}) => {
    return <TaskEditsBox className="task-edits__box">
        <TaskEditsWrap>
            <TaskEditsWrapper>
                <TaskEditsFile ref={registerRef} type="file" name={"file1_" + taskId} id="input__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                    <TaskEditsFileIcon>
                      <ImgWrapper path={"/img/edit/link.svg"}/>
                    </TaskEditsFileIcon>
                </label>
            </TaskEditsWrapper>
            <div className="task-edits__wrapper">
                <TaskEditsFile ref={registerRef} type="file" name={"file2_" + taskId} id="input__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                    <TaskEditsFileIcon>
                        <ImgWrapper path={"/img/edit/photo.svg"}/>
                    </TaskEditsFileIcon>
                </label>
            </div>
            <div className="task-edits__wrapper">
                <TaskEditsFile ref={registerRef} type="file" name={"file3_" + taskId} id="input__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                        <TaskEditsFileIcon>
                            <ImgWrapper path={"/img/edit/movie.svg"}/>
                        </TaskEditsFileIcon>
                </label>
            </div>
        </TaskEditsWrap>
    </TaskEditsBox>
}
