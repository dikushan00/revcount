import {instance} from "./API";
import {
    ActionHistoryType,
    EditType,
    InviteProjectType,
    InviteStatusType,
    OfferType,
    ProjectPostType,
    ProjectType, WorkspaceMessageType
} from "../types/projectTypes";
import {UserType} from "../types/userTypes";

export const ProjectAPI =  {
    getProjects(userId: number) {
        return instance && instance.get<ProjectType[]>(`users/${userId}/projects`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    async createProject(project: any, userId: number) {
        return instance.post<ProjectType>(`users/${userId}/projects`, project, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    getProject(projectId: number) {
        return instance && instance.get(`projects/${projectId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    joinToProject(projectId: number, data: {
        username: string,
        hoursRate: number | string
    }) {
        return instance.post(`projects/${projectId}/users`, data).then(res => res.data)
    },
    addMemberToProjectViaId(data: {
        user_id: number,
        project_id: number
    }[]) {
        return instance.post(`projects/invitations`, data).then(res => res.data)
    },
    changeProjectUsersRole(projectId: number, data: { role: string }) {
        return instance.post(`projects/${projectId}/users`, data).then(res => res.data)
    },
    editProject(projectId: number, project: ProjectType) {
        return instance && instance && instance.put("projects/" + projectId, project).then(res => res.data)
    },
    getRevisions(projectId: number) {
        return instance && instance.get<EditType[]>(`projects/${projectId}/revisions`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    getProjectUsers(projectId: number) {
        return instance && instance.get<UserType[]>(`projects/${projectId}/users`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    acceptOffer(projectId: number, data: any) {
        return instance && instance.put(`projects/${projectId}/accept_offer`, data).then(res => res.data)
    },
    reserveMoney(projectId: number, data: any) {
        return instance.put(`projects/${projectId}/reserve`, data).then(res => res.data)
    },
    getOffer(projectId: number, revisionId: number) {
        return instance && instance.get(`revisions/${revisionId}/offer/` + projectId).then(res => res.data)
    },
    sendOffer(projectId: number, revisionId: number, offer: OfferType) {
        return instance && instance.post(`revisions/${revisionId}/offer/` + projectId, offer).then(res => res.data)
    },
    completeProject(projectId: number, data: any) {
        return instance && instance.post(`projects/${projectId}/complete_project`, data).then(res => res.data)
    },
    getStatuses() {
        return instance && instance.get("statuses").then(res => res.data)
    },
    getRevisionWorkspace(revisionId: number) {
        return instance && instance.get<WorkspaceMessageType[]>(`revisions/${revisionId}/workspace`).then(res => res.data)
    },
    getProjectActions(projectId: number) {
        return instance && instance.get<ActionHistoryType[]>(`projects/${projectId}/actions`).then(res => res.data)
    },
    getInvitations(userId: number) {
        return instance && instance.get<InviteProjectType[]>(`users/${userId}/invitations`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    sendInvitation(projectId: number, body: ContactPostType[]) {
        return instance && instance.post<any>(`invitations`, body, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    sendInvitationByContact(projectId: number, body: ContactPostType[]) {
        return instance && instance.post<any>(`projects/${projectId}/invitations`, body, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    acceptProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "ACCEPTED" as InviteStatusType}).then(res => res.data)
    },
    declineProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "DECLINED" as InviteStatusType}).then(res => res.data)
    }
}

export interface ContactPostType {username: string, project_id: number}[]