import axiosClient from "../axiosClient";
import { URLS } from "../url";

export const SettingsApi={
    getHeader(body) {
        return axiosClient.get(URLS?.getHeader, body);
    },
    getMenuList(body) {
        return axiosClient.get(URLS?.getMenuList, body);
    },
    getHeaderCourses(body) {
        return axiosClient.post(URLS?.getHeaderCourses, body);
    },
    
}