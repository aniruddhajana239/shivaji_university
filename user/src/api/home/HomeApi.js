import axiosClient from "../axiosClient";
import { URLS } from "../url";

export const HomeApi={
    getAll(body) {
        return axiosClient.post(URLS?.getHome, body);
    },
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
    getUpcomingSports(body) {
        return axiosClient.post(URLS?.getUpcomingSports, body);
    },
    getUpcomingAcademic(body) {
        return axiosClient.post(URLS?.getUpcomingAcademic, body);
    },
    getUpcomingCultural(body) {
        return axiosClient.post(URLS?.getUpcomingCultural, body);
    },
    getUpcomingWorkshop(body) {
        return axiosClient.post(URLS?.getUpcomingWorkshop, body);
    },
    getUpcomingTestimonials(body) {
        return axiosClient.post(URLS?.getUpcomingTestimonials, body);
    },
    
}