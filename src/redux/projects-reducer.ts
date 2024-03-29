import {InferActionsTypes, ThunkType} from "./store-redux";
import {
    ActionHistoryType,
    EditType,
    InviteProjectType,
    OfferType,
    ProjectRolesType,
    ProjectType,
    StatusType
} from "../types/projectTypes";
import {TaskTypeWithFlag} from "../../components/projects/edits/EditTasksPanel";
import {UserType} from "../types/userTypes";
import {ProjectAPI} from "../api/ProjectAPI";
import {calculateDaysLeft} from "../utils/calculateDaysLeft";

export const defaultTaskObj = [{
    id: 1,
    description: "",
    name: "",
    isEdit: true,
    files: []
}] as TaskTypeWithFlag[]

const initialState = {
    projects: null as ProjectType[] | null,
    invitations: null as InviteProjectType[] | null,
    tasks: defaultTaskObj,
    revisions: {
        projectId: null as number | null,
        revisionsList: [] as EditType[]
    },
    activeEdit: null as EditType | null,
    activeProject: null as ProjectType | null,
    isFetching: false,
    statuses: [
        {
            "id": 1,
            "name": "Approval",
            "key": "approval"
        },
        {
            "id": 2,
            "name": "Reservation",
            "key": "reservation"
        },
        {
            "id": 3,
            "name": "Performing",
            "key": "performing"
        },
        {
            "id": 4,
            "name": "Editing is done",
            "key": "editing"
        }
    ] as StatusType[] | null, //you can make an endpoint to get statuses
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
        case "REVCOUNT/PROJECTS/ADD_ROLE_TO_PROJECT": {
            return {
                ...state,
                activeProject: state.activeProject && {...state.activeProject, user_role: action.payload},
            };
        }
        case "REVCOUNT/PROJECTS/ADD_USERS_TO_PROJECT": {
            return {
                ...state,
                //@ts-ignore
                activeProject: {
                    ...state.activeProject,
                    users: state.activeProject?.users
                        ? [...state.activeProject.users, ...action.users]
                        : [...action.users]
                },
            };
        }
        case "REVCOUNT/PROJECTS/ADD_USER_TO_PROJECT": {
            return {
                ...state,
                //@ts-ignore
                activeProject: {
                    ...state.activeProject,
                    users: state.activeProject?.users
                        ? [...state.activeProject.users, action.payload]
                        : [action.payload]
                },
            };
        }
        case "REVCOUNT/PROJECTS/ACCEPT_PROJECT": {
            let acceptedProject = state.invitations && state.invitations.find(p => p.invitation_id === action.invitationId)
            if (!acceptedProject)
                acceptedProject = null
            return {
                ...state,
                invitations: state.invitations && state.invitations?.filter(p => p.invitation_id !== action.invitationId),
                //@ts-ignore
                projects: state.projects ? acceptedProject && [...state.projects, acceptedProject] : state.projects
            };
        }
        case "REVCOUNT/PROJECTS/DECLINE_PROJECT": {
            return {
                ...state,
                invitations: state.invitations && state.invitations?.filter(p => p.invitation_id !== action.invitationId),
            };
        }
        case "REVCOUNT/PROJECTS/DELETE_PROJECT": {
            return {
                ...state,
                projects: state.projects && state.projects?.filter(p => p.project_id !== action.projectId)
            };
        }
        case "REVCOUNT/PROJECTS/ADD_EDITS_TO_PROJECT": {
            let projects = state.projects && [...state.projects]
            let edited = projects?.map(item => {
                if (item.project_id === action.projectId)
                    return {...item, edits: item.revisions}
                return item
            })
            return {
                ...state,
                projects: edited || projects,
            };
        }
        case "REVCOUNT/PROJECTS/ADD_EDIT_TO_PROJECT": {
            let projects = state.projects && [...state.projects]
            let edited = projects?.map(item => {
                if (item.project_id === action.projectId) {
                    if (item.revisions)
                        return {...item, revisions: [...item.revisions, {...action.edit, id: item.revisions.length}]}
                    return {...item, revisions: [{...action.edit, id: 1}]}
                }
                return item
            })
            return {
                ...state,
                revisions: action.projectId === state.revisions.projectId ? {
                    ...state.revisions,
                    revisionsList: [...state.revisions.revisionsList, action.edit]
                } : state.revisions,
                activeProject: state.activeProject &&
                    {
                        ...state.activeProject,
                        revisions: state.activeProject?.revisions ? [...state.activeProject?.revisions, action.edit] : [action.edit]
                    },
                projects: edited || projects
            }
        }
        case "REVCOUNT/PROJECTS/SET_INVITATIONS": {
            return {
                ...state,
                invitations: action.invitations,
            };
        }
        case "REVCOUNT/PROJECTS/SET_ACTIVE_EDIT": {
            return {
                ...state,
                activeEdit: action.edit,
            };
        }
        case "REVCOUNT/PROJECTS/SET_PROJECT_USERS": {
            return {
                ...state,
                activeProject: state.activeProject && {...state.activeProject, users: action.users},
            };
        }
        case "REVCOUNT/PROJECTS/ADD_PROJECT_USERS": {
            return {
                ...state,
                activeProject: state.activeProject && {
                    ...state.activeProject, users: state.activeProject?.users
                        ? [...state.activeProject?.users, action.user]
                        : [action.user]
                },
            };
        }
        case "REVCOUNT/PROJECTS/SET_REVISIONS": {
            return {
                ...state,
                revisions: {
                    projectId: action.projectId,
                    revisionsList: action.revisions || []
                },
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
                tasks: [...state.tasks, {id, name: "", isEdit: true, files: [], description: ""}],
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
        case "REVCOUNT/PROJECTS/SET_PROJECT_ACTIONS": {
            let actions = action.payload.map(item => {
                if(item.offer) {
                    let deadline = calculateDaysLeft(item.offer.deadline)
                    return {...item, validOffer: {...deadline, amount: item.offer.amount}}
                }
                return item
            })
            return {
                ...state,
                activeProject: state.activeProject && {...state.activeProject, actionsHistory: actions},
            };
        }
        case "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT": {
            return {
                ...state,
                activeProject: action.project,
            };
        }
        case "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT_OFFER": {
            return {
                ...state,
                activeProject: state.activeProject && {
                    ...state.activeProject, revisions: state.activeProject?.revisions?.map(item => {
                        if (item.revision_id === action.revisionId)
                            return {...item, offer: action.offer}
                        return item
                    })
                },
            };
        }
        case "REVCOUNT/PROJECTS/SET_USER_ROLE": {
            return {...state, activeProject: state.activeProject && {...state.activeProject, user_role: action.payload}}
        }
        case "REVCOUNT/PROJECTS/SET_FETCHING": {
            return {...state, isFetching: action.payload}
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
    addRoleToProject: (role: ProjectRolesType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_ROLE_TO_PROJECT", payload: role} as const),
    addUserToProject: (user: UserType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_USER_TO_PROJECT", payload: user} as const),
    addUsersToProject: (users: UserType[]) =>
        ({type: "REVCOUNT/PROJECTS/ADD_USERS_TO_PROJECT", users} as const),
    acceptProject: (invitationId: number) =>
        ({type: "REVCOUNT/PROJECTS/ACCEPT_PROJECT", invitationId} as const),
    declineProject: (invitationId: number) =>
        ({type: "REVCOUNT/PROJECTS/DECLINE_PROJECT", invitationId} as const),
    deleteProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/DELETE_PROJECT", projectId} as const),
    addEditToProject: (projectId: number, edit: EditType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_EDIT_TO_PROJECT", edit, projectId} as const),
    setInvitations: (invitations: InviteProjectType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_INVITATIONS", invitations} as const),
    setRevisions: (projectId: number | null, revisions: EditType[] | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_REVISIONS", projectId, revisions} as const),
    setTasks: (tasks: TaskTypeWithFlag[] | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_TASKS", tasks} as const),
    setProjectUsers: (users: UserType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_PROJECT_USERS", users} as const),
    addProjectUser: (user: UserType) =>
        ({type: "REVCOUNT/PROJECTS/ADD_PROJECT_USERS", user} as const),
    addTask: () =>
        ({type: "REVCOUNT/PROJECTS/ADD_TASK"} as const),
    addRevisionsToProject: (revisions: EditType[], projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/ADD_EDITS_TO_PROJECT", revisions, projectId} as const),
    enableEditModeToTask: (taskId: number) =>
        ({type: "REVCOUNT/PROJECTS/ENABLE_EDIT_MODE_TO_TASK", taskId} as const),
    deleteTask: (taskId: number) =>
        ({type: "REVCOUNT/PROJECTS/DELETE_TASK", taskId} as const),
    setStatuses: (statuses: StatusType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_STATUSES", statuses} as const),
    setProjectActions: (actions: ActionHistoryType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_PROJECT_ACTIONS", payload: actions} as const),
    setActiveProject: (project: ProjectType | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT", project} as const),
    setActiveProjectOffer: (revisionId: number, offer: OfferType) =>
        ({type: "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT_OFFER", offer, revisionId} as const),
    setActiveEdit: (edit: EditType | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_ACTIVE_EDIT", edit} as const),
    setUserRole: (role: ProjectRolesType) =>
        ({type: "REVCOUNT/PROJECTS/SET_USER_ROLE", payload: role} as const),
    setIsFetching: (isFetching: boolean) =>
        ({type: "REVCOUNT/PROJECTS/SET_FETCHING", payload: isFetching} as const),
}

export const getProjects = (userId: number): GetThunkType => async (dispatch) => {
    if (userId) {
        // dispatch(actionsProjects.setIsFetching(true))
        await ProjectAPI.getProjects(userId).then(res => {
            // dispatch(actionsProjects.setIsFetching(false))
            if (res && res.length > 0) {
                dispatch(actionsProjects.setProjects(res))
            }
        }).catch(e => {
            // dispatch(actionsProjects.setIsFetching(false))
            console.log(e)
        })
    }
}
export const getProjectInfo = (projectId: number): GetThunkType => async (dispatch, getState) => {
    const project = getState().projects.activeProject
    if (projectId) {
        !project?.users && await ProjectAPI.getProjectUsers(projectId).then(res => {
            res && dispatch(actionsProjects.setProjectUsers(res))
        }).catch(e => {
            console.log(e)
        })

        !project?.actionsHistory && await ProjectAPI.getProjectActions(projectId).then(res => {
            res && dispatch(actionsProjects.setProjectActions(res))
        }).catch(e => {})
    }
}

export const getInvitations = (userId: number): GetThunkType => async (dispatch) => {
    userId && await ProjectAPI.getInvitations(userId).then(res => {
        dispatch(actionsProjects.setInvitations(res))
    }).catch(e => {
        console.log(e)
    })
}