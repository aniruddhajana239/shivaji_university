import { all } from "redux-saga/effects";
import SettingsSaga from "./settings/Settings";
import HeaderSaga from "./settings/Header";
import HeroSaga from "./home/Hero";
import FacultySaga from "./home/Faculty";
import ExternalLogosSaga from "./home/ExternalLogos";
import YoutubeVideoSaga from "./home/YoutubeVideo";
import LatestNewsSaga from "./home/LatestNews";
import MenusSaga from "./settings/MenuList";
import HomeSaga from "./home/HomeSaga";
import NewsSaga from "./home/News";
import AnnouncementSaga from "./home/Announcement";
import EventsSaga from "./home/Events";
import QuickLinksSaga from "./home/QuickLinks"; 
import NoticeBoardSaga from "./home/NoticeBoard";
import DynamicCardsSaga from "./home/dynamicCardsSaga";
export function* rootSaga() {

  yield all([
     SettingsSaga(),
     HeaderSaga(),
     HeroSaga(),
     FacultySaga(),
     ExternalLogosSaga(),
     YoutubeVideoSaga(),
     LatestNewsSaga(),
     MenusSaga(),
     HomeSaga(),
     NewsSaga(),
     AnnouncementSaga(),
     EventsSaga(),
     QuickLinksSaga(),
     NoticeBoardSaga(),
     DynamicCardsSaga(),
  ]);
}