import {UserType} from "./userTypes";

export type ProjectType = {
    id: number
    name: string
    deadline: number
    addDeadline: number
    freeEdits: number
    balance: number
    edits: EditType[],
    users: UserType[],
    actionsHistory: ActionHistoryType[]
}
type ActionHistoryType = {
    id: number,
    "action": string,
    "time": string,
    "offer": {
        "balance": number,
        "days": number,
        "hours": number
    },
    "edit": EditType
}
export type EditType = {
    id: number,
    status: StatusType
    description: string
    name: string
    tasks: TaskType[]
}
export type TaskType = {
    id: number
    name: string,
    workspace: WorkspaceMessageType[]
}

export type WorkspaceMessageType = {
    date: number,
    message: string
}

export type StatusType = {
    id: number
    name: StatusesNamesType
}
export type StatusesNamesType = "Approval" | "Reservation" | "Performing" | "Editing is done"