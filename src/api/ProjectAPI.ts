import {instance} from "./API";
import {OfferType, ProjectPostType, ProjectType} from "../types/projectTypes";

export const ProjectAPI = {
    createProject(project: ProjectPostType) {
        return instance.post("projects", project).then(res => res.data)
    },
    getProjects() {
        return instance.get("projects").then(res => res.data)
    },
    getProject(projectId: number) {
        return instance.get("projects/" + projectId).then(res => res.data)
    },
    editProject(projectId: number, project: ProjectType) {
        return instance.put("projects/" + projectId, project).then(res => res.data)
    },
    joinToProject(projectId: number, userId: number) {
        return instance.post("projects/" + projectId, {userId}).then(res => res.data)
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
    getInvitations() {
        return instance.get("invitations").then(res => res.data)
    },
    acceptProject(projectId: number) {
        return instance.delete("invitations/" + projectId).then(res => res.data)
    },
    declineProject(projectId: number) {
        return instance.post("invitations/" + projectId).then(res => res.data)
    }
}