import {AppStateType} from "./store-redux";


export const getUserId = (state: AppStateType) => state.auth.userId
export const getActiveProject = (state: AppStateType) => state.projects.activeProject
export const getActiveEdit = (state: AppStateType) => state.projects.activeEdit
export const getStatuses = (state: AppStateType) => state.projects.statuses
export const getTasks = (state: AppStateType) => state.projects.tasks
export const getInvitations = (state: AppStateType) => state.projects.invitations