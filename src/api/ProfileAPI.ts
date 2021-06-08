import Axios from "axios";
import {instance} from "./API";
import {ProfileType} from "../types/userTypes";

export const ProfileAPI = {

    getProfile() {
        return instance.get(`profile`).then((response) => {
            return response.data;
        });
    },
    getContacts() {
        return instance.get(`contacts`).then((response) => {
            return response.data;
        });
    },

    editProfile(id: number, body: ProfileType) {
        return instance.put(`users/${id}`, body).then((response) => {
            return response.data;
        });
    },

    getCurrentSeason() {
        return instance.get("currentSeason").then(res => {
            return res.data
        })
    },
};