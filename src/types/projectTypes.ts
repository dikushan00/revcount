import {RoleType, UserType} from "./userTypes";

export interface ProjectPostType {
    name: string
    deadline: number
    addDeadline: number
    freeEdits: number
    balance: number
    edits: EditType[],
    users: UserType[],
    actionsHistory: ActionHistoryType[]
}
export interface ProjectType extends ProjectPostType{
    id: number
    role: RoleType
}
type ActionHistoryType = {
    id: number,
    "action": string,
    "time": string,
    "offer": OfferType,
    "edit": EditType
}

export type OfferType = {
    "balance": number,
    "days": number,
    "hours": number
}

export type WorkspaceMessageType = {
    id: number
    date: number,
    message: string
}
export type EditType = {
    id?: number,
    status: EditStatusType
    description: string
    offer?: OfferType,
    name: string
    deadline?: string
    workspace?: WorkspaceMessageType[]
    tasks?: TaskType[]
}
export interface TaskType {
    id: number
    description: string,
    files: File[]
}

export interface StatusType {
    id: number
    name: StatusesNamesType
    key: StatusesKeysType
}
export interface EditStatusType extends StatusType{
    isAccepted: boolean
}
export type StatusesNamesType = "Approval" | "Reservation" | "Performing" | "Editing is done"
export type StatusesKeysType = "approval" | "reservation" | "performing" | "editing"