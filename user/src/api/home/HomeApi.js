import axiosClient from "../axiosClient";
import { URLS } from "../url";

export const HomeApi={
    getBanners(body) {
        return axiosClient.post(URLS?.getBanners, body);
    },
    getFaculties(body) {
        return axiosClient.post(URLS?.getFaculties, body);
    },
    getExternalLogos(body) {
        return axiosClient.post(URLS?.getExternalLogos, body);
    },
    getYoutubeVideo(body) {
        return axiosClient.post(URLS?.getYoutubeVideo, body);
    },
    getLatestNews(body) {
        return axiosClient.post(URLS?.getLatestNews, body);
    },
    
}