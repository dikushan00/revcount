import {RoleType, UserType} from "./userTypes";

export interface ProjectPostType {
    name: string
    deadline: string
    included_revisions: number
    addDeadline?: number
    freeEdits?: number
    balance: number
    users?: UserType[],
    revisions?: EditType[],
    invitations: { user_id: string | number }[],
    actionsHistory?: ActionHistoryType[]
}

export interface ProjectType extends ProjectPostType {
    project_id: number
    role?: RoleType
}

export interface InviteProjectType {
    invitation_id: number,
    name: string,
    project_id: number,
    status: InviteStatusType
}

type ActionHistoryType = {
    id: number,
    "action": string,
    "time": string,
    "offer": OfferType,
    "edit": EditType
}

export type OfferType = {
    amount: number
    deadline: string
}

export type InviteStatusType = "PENDING" | "ACCEPTED" | "DECLINED"

export type WorkspaceMessageType = {
    id: number
    date: number,
    message: string
}
export type EditType = {
    revision_id?: number,
    status: StatusesNamesType
    description: string
    name: string
    next_action: string
    workspace?: WorkspaceMessageType[]
    tasks?: TaskType[]
}

export interface TaskType {
    id: number
    name: string,
    description: string,
    files?: File[]
}

export interface StatusType {
    id?: number
    name: StatusesNamesType
    key?: StatusesKeysType
}

export interface EditStatusType extends StatusType {
    isAccepted?: boolean
}

export type StatusesNamesType = "Approval" | "Reservation" | "Performing" | "Editing is done"
export type StatusesKeysType = "approval" | "reservation" | "performing" | "editing"