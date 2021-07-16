import {UserType} from "./userTypes";

export interface ProjectPostType {
    name: string
    project_name?: string
    deadline: string
    included_revisions?: number
    addDeadline?: number
    balance: number
    user_role?: ProjectRolesType
    users?: UserType[],
    revisions?: EditType[],
    invitations: { username: string }[],
    actionsHistory?: ActionHistoryType[]
    workspace?: WorkspaceMessageType[]
    message?: string
}

export type ProjectRolesType = "OWNER" | "ARTIST"
export type ValidProjectRolesType = "Owner" | "Artist"

export interface ProjectType extends ProjectPostType {
    project_id: number
}

export type ProjectObjKeysType = keyof ProjectType

export interface InviteProjectType {
    invitation_id: number,
    project_name: string,
    project_id: number,
    status: InviteStatusType
}

export type ActionHistoryType = {
    id: number,
    action: string,
    time: string,
    offer: OfferType,
    validOffer: { hours: number | null, days: number | null, amount: number },
    edit: EditType
}

export type OfferType = {
    offer_id: number
    amount: number
    status: InviteStatusType
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
    offer?: OfferType
    isOfferAccepted?: boolean
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