import Axios from "axios";
import {instance} from "./API";
import {ProfileType} from "../types/UserTypes";

export const ProfileAPI = {

    getProfile(id: number) {
        return instance.get(`users/${id}`).then((response) => {
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