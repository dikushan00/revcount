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
        return instance.post<ProjectType>(`users/${userId}/projects`, project).then(res => res.data)
    },
    getProjects(userId: number) {
        return instance.get<ProjectType[]>(`users/${userId}/projects`).then(res => res.data)
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
    joinToProject(projectId: number, body: { username: string, hoursRate: number }) {
        return instance.post(`projects/${projectId}/users`, body).then(res => res.data)
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
    getOffer(projectId: number, revisionId: number) {
        return instance.get(`revisions/${revisionId}/offer` + projectId).then(res => res.data)
    },
    sendOffer(projectId: number, revisionId: number, offer: OfferType) {
        return instance.post(`revisions/${revisionId}/offer` + projectId, offer).then(res => res.data)
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
    sendInvitation(projectId: number, body: {user_id: string}[]) {
        return instance.post<any>(`projects/${projectId}/invitations`, body).then(res => res.data)
    },
    sendInvitationByEmail(projectId: number, body: {email: string}) {
        return instance.post<any>(`projects/${projectId}/invitations`, body).then(res => res.data)
    },
    sendInvitationByContact(projectId: number, body: {user_id: string}) {
        return instance.post<any>(`projects/${projectId}/invitations`, body).then(res => res.data)
    },
    acceptProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "ACCEPTED" as InviteStatusType}).then(res => res.data)
    },
    declineProject(userId: number, invitationId: number) {
        return instance.patch(`users/${userId}/invitations/${invitationId}`, {status: "DECLINED" as InviteStatusType}).then(res => res.data)
    }
}