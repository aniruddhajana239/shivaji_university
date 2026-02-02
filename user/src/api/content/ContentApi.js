import axiosClient from "../axiosClient";
import { URLS } from "../url";

export const ContentApi={
    getContentDetails(body) {
        return axiosClient.post(`${URLS?.getContentByMenuId}?menu_id=${body.menu_id}`);
    },
     getQuickLinks() {
        return axiosClient.get(`${URLS?.getQuickLinks}`);
    },
    getNoticeBoard() {
        return axiosClient.get(`${URLS?.getNoticeBoard}`);
    },
   
    
}