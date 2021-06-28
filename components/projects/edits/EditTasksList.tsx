import React from 'react';
import {TaskTypeWithFlag} from "./EditTasksPanel";
import {
    FormEditBox,
    FormEditInput,
    TaskEditsBlock,
    TaskEditsBody,
    TaskEditsBox,
    TaskEditsDelete,
    TaskEditsEdit,
    TaskEditsFile,
    TaskEditsFileIcon,
    TaskEditsItem,
    TaskEditsList,
    TaskEditsNumber,
    TaskEditsTextarea,
    TaskEditsTop,
    TaskEditsWrap,
    TaskEditsWrapper
} from "../../styled/edit/components";
import {ImgWrapper} from "../../common/blocks/ImgWrapper";
import {Controller} from "react-hook-form";
import {ValidationError} from "../../common/form/ValidationError";

type PropsType = {
    control: any
    errors: any
    tasks: TaskTypeWithFlag[] | null
    enableEditMode: (id: number) => void
    deleteTask: (id: number) => void
}

export const EditTasksList: React.FC<PropsType> = ({control, tasks, errors, enableEditMode, deleteTask}) => {
    return <TaskEditsList className="task-edits__list">
        {
            tasks?.map(task => {
                return <TaskEditsItem key={task.id}
                                      className={"task-edits__item " + (task.isEdit ? "task-open" : "")}>
                    <TaskEditsTop className={"task-edits__top"}>
                        <TaskEditsNumber className="task-edits__number"/>
                        {task.isEdit && <EditBox errors={errors} controlRef={control} taskId={task.id}/>}
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
                        <Controller as={<TaskEditsTextarea placeholder="Describe the task clearly..." />}
                                    name={`description_${task.id}`}
                                    rules={{required: true}}
                                    control={control}
                                    defaultValue={task?.description || ""}
                        />
                        {errors[`description_${task.id}`] && <ValidationError/>}
                    </TaskEditsBody>
                </TaskEditsItem>
            })
        }
    </TaskEditsList>
};

const EditBox: React.FC<{ taskId: number, controlRef: any, errors: any }> = ({taskId, controlRef, errors}) => {
    return <TaskEditsBox className="task-edits__box">
        <TaskEditsWrap>
            <TaskEditsWrapper>
                <Controller as={<TaskEditsFile placeholder="Write name here" type="file" id="input__file" multiple/>}
                            name={`file1_${taskId}`}
                            control={controlRef}
                            defaultValue={""}
                />
                {errors[`file1_${taskId}`] && <ValidationError/>}
                <label htmlFor="input__file" className="task-edits__file-button">
                    <TaskEditsFileIcon>
                        <ImgWrapper path={"/img/edit/link.svg"}/>
                    </TaskEditsFileIcon>
                </label>
            </TaskEditsWrapper>
            <div className="task-edits__wrapper">
                <Controller as={<TaskEditsFile placeholder="Write name here" type="file" id="input__file" multiple/>}
                            name={`file2_${taskId}`}
                            control={controlRef}
                            defaultValue={""}
                />
                {errors[`file2_${taskId}`] && <ValidationError/>}
                <label htmlFor="input__file" className="task-edits__file-button">
                    <TaskEditsFileIcon>
                        <ImgWrapper path={"/img/edit/photo.svg"}/>
                    </TaskEditsFileIcon>
                </label>
            </div>
            <div className="task-edits__wrapper">
                <Controller as={<TaskEditsFile placeholder="Write name here" type="file" id="input__file" multiple/>}
                            name={`file3_${taskId}`}
                            control={controlRef}
                            defaultValue={""}
                />
                {errors[`file3_${taskId}`] && <ValidationError/>}
                <label htmlFor="input__file" className="task-edits__file-button">
                    <TaskEditsFileIcon>
                        <ImgWrapper path={"/img/edit/movie.svg"}/>
                    </TaskEditsFileIcon>
                </label>
            </div>
        </TaskEditsWrap>
    </TaskEditsBox>
}
