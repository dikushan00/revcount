import * as React from "react";
import {useForm} from "react-hook-form";
import {EditStatusType, EditType, ProjectType, TaskType} from "../../../src/types/projectTypes";
import {MainLayOut} from "../../../components/layouts/MainLayOut";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {actionsProjects} from "../../../src/redux/projects-reducer";
import {ProjectAPI} from "../../../src/api/ProjectAPI";
import {AppStateType} from "../../../src/redux/store-redux";

interface TaskTypeWithFlag extends TaskType {
    isEdit: boolean
}

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
    const project = useSelector((state:AppStateType) => state.projects.activeProject)
    const [tasks, setTasks] = React.useState<TaskTypeWithFlag[]>([{
        id: 1,
        description: "",
        isEdit: false,
        files: []
    }])

    const enableEditMode = (taskId: number) => {
        let edited = tasks.map(item => {
            if (item.id === taskId)
                return {...item, isEdit: true}
            return item
        })
        setTasks(edited)
    }

    const deleteTask = (taskId: number) => {
        let edited = tasks.filter(item => item.id !== taskId)
        setTasks(edited)
    }
    const addTask = () => {
        let id = tasks.length
        let isExist = tasks.find(item => item.id === id)
        while (isExist) {
            id++
            isExist = tasks.find(item => item.id === id)
        }
        setTasks(state => ([...state, {id, isEdit: false, files: [], description: ""}]))
    }
    const onSubmit = (obj: any) => {
        let editPost: EditType = {
            name: watch("name"),
            tasks: [],
            status: defaultFirstStatus,
            description: ""
        }
        tasks.forEach(item => {
            let task: TaskType = {
                id: item.id,
                description: "",
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
                                    typeof obj[key][i] !== "function" &&  task.files.push(obj[key][i])
                            }
                        }

                    }
                }
            }
            editPost?.tasks?.push(task)
        })
        let projectPost: ProjectType
        if(project?.edits)
            projectPost = {...project, edits: [...project.edits, {...editPost, id: project.edits.length}]}
        else {
            //@ts-ignore
            projectPost = {...project, edits: [{...editPost, id: 1}]}
        }

        projectId && ProjectAPI.editProject(+projectId, projectPost).then(res => {
            if(!res?.error) {
                dispatch(actionsProjects.setActiveProject(res))
                router.push("/projects/" + projectId)
            }
        })
    }

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
                <div className="form-edit__wrapper">
                    <h4 className="form-edit__label">
                        Edit Task’s
                    </h4>
                    <ol className="task-edits__list">
                        {
                            tasks?.map(task => {
                                return <li key={task.id}
                                           className={"task-edits__item " + (task.isEdit ? "task-open" : "")}>
                                    <div className="task-edits__top">
                                        <div className="task-edits__number"/>
                                        {task.isEdit && <EditBox registerRef={register} taskId={task.id}/>}
                                        <div className="task-edits__block">
                                            <div onClick={() => enableEditMode(task.id)}
                                                 className="task-edits__edit">Edit
                                            </div>
                                            <div onClick={() => deleteTask(task.id)}
                                                 className="task-edits__delete">Delete
                                            </div>
                                        </div>
                                    </div>
                                    <div className="task-edits__body">
                                        <textarea ref={register} className="task-edits__textarea"
                                                  name={"description_" + task.id}
                                                  placeholder="Describe the task clearly..." defaultValue={""}/>
                                    </div>
                                </li>
                            })
                        }
                    </ol>
                </div>
                <div className="task-edits__inner">
                    <div onClick={addTask} className="task-edits__btn btn-2">Add new task <span>+</span></div>
                    <button type={"submit"} className="task-edits__btn-correction btn">Add correction to project
                    </button>
                </div>
            </form>
        </section>
    </MainLayOut>
}

const EditBox: React.FC<{ taskId: number, registerRef: any }> = ({taskId, registerRef}) => {
    return <div className="task-edits__box">
        <div className="task-edits__wrap">
            <div className="task-edits__wrapper">
                <input ref={registerRef} type="file" name={"file1_" + taskId} id="input__file"
                       className="task-edits__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                    <span className="task-edits__file-icon">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.13221 15.359C8.12053 15.3534 8.10901 15.3476 8.09733 15.3419C8.06913 15.4032 8.03045 15.4608 7.97995 15.5113C7.49874 15.9925 6.86643 16.2332 6.23432 16.2332C5.60206 16.2332 4.96995 15.9926 4.48866 15.5112C4.02234 15.045 3.76558 14.425 3.76558 13.7656C3.76558 13.1062 4.02241 12.4862 4.48874 12.0199L6.92296 9.58564C7.38928 9.11936 8.00924 8.86256 8.66866 8.86256C9.32807 8.86256 9.94803 9.11936 10.4143 9.58564C10.4146 9.58596 10.4149 9.58623 10.4152 9.5865C10.6599 9.83096 10.9852 9.96553 11.3312 9.96553C11.6777 9.96549 12.0033 9.83061 12.2483 9.58564L13.9047 7.92932C13.6682 7.56568 13.3937 7.22674 13.0835 6.91643C12.7733 6.60627 12.4344 6.33178 12.0706 6.09529C11.844 5.94799 11.6077 5.81533 11.3627 5.69826C10.5313 5.30119 9.60244 5.09131 8.67651 5.09131C7.74592 5.09131 6.81253 5.30318 5.97725 5.704C5.91604 5.73342 5.85554 5.764 5.79542 5.79529C5.23198 6.08865 4.71839 6.46494 4.26679 6.91643L1.82601 9.35721C0.648475 10.5347 -3.90607e-05 12.1003 1.76455e-09 13.7656C1.76455e-09 15.4308 0.648515 16.9964 1.82601 18.1739C3.00339 19.3513 4.56894 19.9998 6.23425 19.9999C6.23448 19.9999 6.23464 19.9999 6.23483 19.9999C7.89971 19.9999 9.4651 19.3514 10.6426 18.1739L12.9088 15.9077C12.3884 16.0214 11.8556 16.0804 11.3235 16.0804C10.2239 16.0804 9.12037 15.8309 8.13221 15.359Z"
                            fill="#888BA0"/>
                        <path
                            d="M18.1739 1.82609C16.9963 0.648514 15.4307 0 13.7656 0C12.1003 0 10.5347 0.648514 9.3572 1.82609L7.09103 4.09222C7.6115 3.97851 8.14435 3.91952 8.67646 3.91952C9.77603 3.91952 10.8795 4.16898 11.8677 4.64089C11.8794 4.64651 11.8909 4.65241 11.9026 4.65804C11.9308 4.59679 11.9695 4.53917 12.0199 4.48874C12.4862 4.02241 13.1061 3.76562 13.7656 3.76562C14.4251 3.76562 15.045 4.02241 15.5113 4.48874C15.9775 4.95499 16.2343 5.57491 16.2343 6.23432C16.2344 6.89374 15.9775 7.51374 15.5112 7.98002L13.0768 10.4143C12.6106 10.8806 11.9906 11.1374 11.3312 11.1374C10.6729 11.1374 10.0541 10.8816 9.58814 10.4169C9.58661 10.4154 9.58505 10.4138 9.58353 10.4123C9.33884 10.1686 9.01404 10.0345 8.66857 10.0345C8.32216 10.0345 7.9965 10.1694 7.7515 10.4144L6.64135 11.5246C6.64107 11.5249 6.64076 11.5251 6.64053 11.5253L6.09521 12.0706C6.3317 12.4344 6.60619 12.7734 6.91635 13.0836C7.22654 13.3938 7.56549 13.6683 7.9292 13.9046V13.9046C8.15588 14.0519 8.39209 14.1846 8.63712 14.3016C9.46849 14.6987 10.3974 14.9086 11.3233 14.9086C12.2539 14.9086 13.1873 14.6967 14.0226 14.2959C14.0838 14.2665 14.1443 14.2359 14.2044 14.2046C14.2036 14.2061 14.2027 14.2077 14.2019 14.2092C14.2027 14.2077 14.2036 14.2062 14.2044 14.2047C14.7679 13.9113 15.2815 13.5351 15.733 13.0835L18.1738 10.6428C19.3514 9.46525 19.9999 7.89963 19.9999 6.2344C19.9999 4.56917 19.3514 3.00359 18.1739 1.82609Z"
                            fill="#888BA0"/>
                      </svg>
                    </span>
                </label>
            </div>
            <div className="task-edits__wrapper">
                <input ref={registerRef} type="file" name={"file2_" + taskId} id="input__file"
                       className="task-edits__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                    <span className="task-edits__file-icon">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 14.7266C11.7475 14.7266 13.1641 13.31 13.1641 11.5625C13.1641 9.81504 11.7475 8.39844 10 8.39844C8.25254 8.39844 6.83594 9.81504 6.83594 11.5625C6.83594 13.31 8.25254 14.7266 10 14.7266Z"
                            fill="#888BA0"/>
                        <path
                            d="M14.6209 3.55469L14.4186 2.54363C14.3095 1.99777 13.8262 1.60156 13.2695 1.60156H6.73023C6.17359 1.60156 5.69027 1.99777 5.58113 2.54363L5.37891 3.55469H14.6209Z"
                            fill="#888BA0"/>
                        <path
                            d="M18.2422 4.72656C16.8663 4.72656 2.40172 4.72656 1.75781 4.72656C0.788555 4.72656 0 5.51512 0 6.48438V16.6406C0 17.6099 0.788555 18.3984 1.75781 18.3984H18.2422C19.2114 18.3984 20 17.6099 20 16.6406V6.48438C20 5.51512 19.2114 4.72656 18.2422 4.72656ZM5 8.39844H3.125C2.80141 8.39844 2.53906 8.13609 2.53906 7.8125C2.53906 7.48891 2.80141 7.22656 3.125 7.22656H5C5.32359 7.22656 5.58594 7.48891 5.58594 7.8125C5.58594 8.13609 5.32359 8.39844 5 8.39844ZM10 15.8984C7.60914 15.8984 5.66406 13.9534 5.66406 11.5625C5.66406 9.17164 7.60914 7.22656 10 7.22656C12.3909 7.22656 14.3359 9.17164 14.3359 11.5625C14.3359 13.9534 12.3909 15.8984 10 15.8984Z"
                            fill="#888BA0"/>
                      </svg>
                    </span>
                </label>
            </div>
            <div className="task-edits__wrapper">
                <input ref={registerRef} type="file" name={"file3_" + taskId} id="input__file"
                       className="task-edits__file" multiple/>
                <label htmlFor="input__file" className="task-edits__file-button">
                        <span className="task-edits__file-icon">
                          <svg width={20} height={18} viewBox="0 0 20 18" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.4141 16.4173H12.9261C13.5521 16.0498 14.1357 15.6003 14.6626 15.0735C16.2848 13.4512 17.1783 11.2942 17.1783 9.00003C17.1783 6.70581 16.2849 4.54886 14.6626 2.92659C13.0403 1.30433 10.8834 0.410889 8.58914 0.410889C6.29492 0.410889 4.13801 1.30433 2.5157 2.92659C0.893438 4.54886 0 6.70577 0 9.00003C0 11.2943 0.893438 13.4512 2.5157 15.0735C4.12582 16.6835 6.26262 17.5752 8.53758 17.5885C8.54176 17.5886 8.54582 17.5892 8.55 17.5892H19.4141C19.7377 17.5892 20 17.3268 20 17.0032C20 16.6796 19.7377 16.4173 19.4141 16.4173ZM5.70457 9.8012C6.84289 9.8012 7.76895 10.7273 7.76895 11.8656C7.76895 13.0039 6.84285 13.93 5.70457 13.93C4.56629 13.93 3.64016 13.0039 3.64016 11.8656C3.64016 10.7273 4.56625 9.8012 5.70457 9.8012ZM3.64016 6.13448C3.64016 4.99616 4.56625 4.07007 5.70457 4.07007C6.84289 4.07007 7.76895 4.99616 7.76895 6.13448C7.76895 7.2728 6.84285 8.19886 5.70457 8.19886C4.56629 8.19886 3.64016 7.2728 3.64016 6.13448ZM13.5381 6.13448C13.5381 7.2728 12.612 8.19886 11.4738 8.19886C10.3355 8.19886 9.40934 7.2728 9.40934 6.13448C9.40934 4.99616 10.3354 4.07007 11.4738 4.07007C12.6121 4.07007 13.5381 4.99616 13.5381 6.13448ZM11.4738 9.8012C12.6121 9.8012 13.5381 10.7273 13.5381 11.8656C13.5381 13.0039 12.612 13.93 11.4738 13.93C10.3355 13.93 9.40934 13.0039 9.40934 11.8656C9.40934 10.7273 10.3354 9.8012 11.4738 9.8012Z"
                                fill="#888BA0"/>
                          </svg>
                        </span>
                </label>
            </div>
        </div>
    </div>
}