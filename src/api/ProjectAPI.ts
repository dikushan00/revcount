import {instance} from "./API";

export const ProjectAPI = {
    getProjects() {
        return instance.get("projects").then(res => res.data)
    },
    getProject(projectId: number) {
        return instance.get("projects/" + projectId).then(res => res.data)
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