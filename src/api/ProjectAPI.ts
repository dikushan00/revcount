import {instance} from "./API";
import {
    EditType,
    InviteProjectType,
    InviteStatusType,
    OfferType,
    ProjectPostType,
    ProjectType
} from "../types/projectTypes";

export const ProjectAPI = {
    createProject(userId: number, project: ProjectPostType) {
        return instance.post<{"project_id": number, name: string, deadline: string, invitations: any, "included_revisions": number, balance: number}>(`users/${userId}/projects`, project).then(res => res.data)
    },
    getProjects(userId: number) {
        return instance.get<{project_id: number, name: string, deadline: string, invitations: any, included_revisions: number, balance: number}[]>(`users/${userId}/projects`).then(res => res.data)
    },
    getProject(projectId: number) {
        return instance.get("projects/" + projectId).then(res => res.data)
    },
    editProject(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    getRevisions(projectId: number) {
        return instance.get<EditType[]>(`projects/${projectId}/revisions`).then(res => res.data)
    },
    createRevision(projectId: number, body: EditType) {
        return instance.post<EditType>(`projects/${projectId}/revisions`, body).then(res => res.data)
    },
    joinToProject(projectId: number, userId: number) {
        return instance.post("projects/" + projectId, {userId}).then(res => res.data)
    },
    getProjectUsers(projectId: number) {
        return instance.get<{"user_id": number, username: string, "first_name": string}>(`projects/${projectId}/users`).then(res => res.data)
    },
    acceptOffer(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    reserveMoney(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    sendOffer(projectId: number, project: ProjectType, offer: OfferType) {
        return instance.put("projects/" + projectId).then(res => res.data)
    },
    completeProject(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    acceptInvitation(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    getStatuses() {
        return instance.get("statuses").then(res => res.data)
    },
    getInvitations(userId: number) {
        return instance.get<InviteProjectType[]>(`users/${userId}/invitations`).then(res => res.data)
    },
    acceptProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "ACCEPTED" as InviteStatusType}).then(res => res.data)
    },
    declineProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "DECLINED" as InviteStatusType}).then(res => res.data)
    }
}