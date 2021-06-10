import {InferActionsTypes, ThunkType} from "./store-redux";
import {EditType, ProjectType, StatusType} from "../types/projectTypes";
import {TaskTypeWithFlag} from "../../components/projects/Edits/EditTasksPanel";

const defaultTaskObj = [{
    id: 1,
    description: "",
    isEdit: false,
    files: []
}] as TaskTypeWithFlag[]

const initialState = {
    projects: null as ProjectType[] | null,
    invitations: null as ProjectType[] | null,
    statuses: null as StatusType[] | null,
    tasks: defaultTaskObj,
    activeProject: null as ProjectType | null
};

type ProjectsInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsProjects>;
type GetThunkType = ThunkType<ActionsType>;

export const projects_reducer = (
    state = initialState,
    action: ActionsType
): ProjectsInitialStateType => {

    switch (action.type) {

        case "REVCOUNT/PROJECTS/SET_PROJECTS": {
            return {
                ...state,
                projects: action.projects,
            };
        }
        case "REVCOUNT/PROJECTS/ADD_PROJECT": {
            return {
                ...state,
                projects: state.projects
                    ? [...state.projects, action.project]
                    : [action.project],
            };
        }
        case "REVCOUNT/PROJECTS/ACCEPT_PROJECT": {
            let acceptedProject = state.invitations && state.invitations.find(p => p.id === action.projectId)
            if (!acceptedProject)
                acceptedProject = null
            return {
                ...state,
                invitations: state.invitations && state.invitations?.filter(p => p.id !== action.projectId),
                projects: state.projects ? acceptedProject && [...state.projects, acceptedProject] : state.projects
            };
        }
        case "REVCOUNT/PROJECTS/DECLINE_PROJECT": {
            return {
                ...state,
                invitations: state.invitations && state.invitations?.filter(p => p.id !== action.projectId),
            };
        }
        case "REVCOUNT/PROJECTS/DELETE_PROJECT": {
            return {
                ...state,
                projects: state.projects && state.projects?.filter(p => p.id !== action.projectId)
            };
        }
        case "REVCOUNT/PROJECTS/ADD_EDIT_TO_PROJECT": {
            let projects = state.projects && [...state.projects]
            let edited = projects?.map(item => {
                if (item.id === action.projectId) {
                    if (item.edits)
                        return {...item, edits: [...item.edits, {...action.edit, id: item.edits.length}]}
                    return {...item, edits: [{...action.edit, id: 1}]}
                }
                return item
            })
            return {
                ...state,
                projects: edited || projects,
            };
        }
        case "REVCOUNT/PROJECTS/SET_INVITATIONS": {
            return {
                ...state,
                invitations: action.invitations,
            };
        }
        case "REVCOUNT/PROJECTS/SET_TASKS": {
            return {
                ...state,
                tasks: action.tasks || defaultTaskObj,
            };
        }
        case "REVCOUNT/PROJECTS/ADD_TASK": {
            let id = state.tasks.length
            let isExist = state.tasks.find(item => item.id === id)
            while (isExist) {
                id++
                isExist = state.tasks.find(item => item.id === id)
            }
            return {
                ...state,
                tasks: [...state.tasks, {id, isEdit: false, files: [], description: ""}],
            };
        }
        case "REVCOUNT/PROJECTS/ENABLE_EDIT_MODE_TO_TASK": {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if (item.id === action.taskId)
                        return {...item, isEdit: true}
                    return item
                })
            };
        }
        case "REVCOUNT/PROJECTS/DELETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.taskId),
            };
        }
        case "REVCOUNT/PROJECTS/SET_STATUSES": {
            return {
                ...state,
                statuses: action.statuses,
            };
        }
        case "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT": {
            return {
                ...state,
                activeProject: action.project,
            };
        }
        default:
            return {...state}
    }
}

export const actionsProjects = {
    setProjects: (projects: ProjectType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_PROJECTS", projects} as const),
    addProject: (project: ProjectType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_PROJECT", project} as const),
    acceptProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/ACCEPT_PROJECT", projectId} as const),
    declineProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/DECLINE_PROJECT", projectId} as const),
    deleteProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/DELETE_PROJECT", projectId} as const),
    addEditToProject: (projectId: number, edit: EditType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_EDIT_TO_PROJECT", edit, projectId} as const),
    setInvitations: (invitations: ProjectType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_INVITATIONS", invitations} as const),
    setTasks: (tasks: TaskTypeWithFlag[] | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_TASKS", tasks} as const),
    addTask: () =>
        ({type: "REVCOUNT/PROJECTS/ADD_TASK"} as const),
    enableEditModeToTask: (taskId: number) =>
        ({type: "REVCOUNT/PROJECTS/ENABLE_EDIT_MODE_TO_TASK", taskId} as const),
    deleteTask: (taskId: number) =>
        ({type: "REVCOUNT/PROJECTS/DELETE_TASK", taskId} as const),
    setStatuses: (statuses: StatusType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_STATUSES", statuses} as const),
    setActiveProject: (project: ProjectType | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT", project} as const),
}
