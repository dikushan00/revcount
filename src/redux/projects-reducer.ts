import {InferActionsTypes, ThunkType} from "./store-redux";
import {ProjectType, StatusType} from "../types/projectTypes";

const initialState = {
    projects: null as ProjectType[] | null,
    invitations: null as ProjectType[] | null,
    statuses: null as StatusType[] | null,
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
        case "REVCOUNT/PROJECTS/SET_INVITATIONS": {
            return {
                ...state,
                invitations: action.invitations,
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
    acceptProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/ACCEPT_PROJECT", projectId} as const),
    declineProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/DECLINE_PROJECT", projectId} as const),
    deleteProject: (projectId: number) =>
        ({type: "REVCOUNT/PROJECTS/DELETE_PROJECT", projectId} as const),
    setInvitations: (invitations: ProjectType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_INVITATIONS", invitations} as const),
    setStatuses: (statuses: StatusType[]) =>
        ({type: "REVCOUNT/PROJECTS/SET_STATUSES", statuses} as const),
    setActiveProject: (project: ProjectType | null) =>
        ({type: "REVCOUNT/PROJECTS/SET_ACTIVE_PROJECT", project} as const),
}
