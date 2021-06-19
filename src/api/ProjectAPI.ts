import {instance} from "./API";
import {
    EditType,
    InviteProjectType,
    InviteStatusType,
    OfferType,
    ProjectPostType,
    ProjectType
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
    getProject(projectId: number) {
        return instance && instance.get("projects/" + projectId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
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
    acceptOffer(projectId: number, project: ProjectType) {
        return instance && instance.put("projects/" + projectId, project).then(res => res.data)
    },
    reserveMoney(projectId: number, project: ProjectType) {
        return instance && instance.put("projects/" + projectId, project).then(res => res.data)
    },
    getOffer(projectId: number, revisionId: number) {
        return instance && instance.get(`revisions/${revisionId}/offer/` + projectId).then(res => res.data)
    },
    sendOffer(projectId: number, revisionId: number, offer: OfferType) {
        return instance && instance.post(`revisions/${revisionId}/offer/` + projectId, offer).then(res => res.data)
    },
    completeProject(projectId: number, project: ProjectType) {
        return instance && instance.put("projects/" + projectId, project).then(res => res.data)
    },
    getStatuses() {
        return instance && instance.get("statuses").then(res => res.data)
    },
    getInvitations(userId: number) {
        return instance && instance.get<InviteProjectType[]>(`users/${userId}/invitations`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.data)
    },
    sendInvitation(projectId: number, body: {user_id: string}[]) {
        return instance && instance.post<any>(`projects/${projectId}/invitations`, body).then(res => res.data)
    },
    sendInvitationByContact(projectId: number, body: {user_id: string}) {
        return instance && instance.post<any>(`projects/${projectId}/invitations`, body).then(res => res.data)
    },
}