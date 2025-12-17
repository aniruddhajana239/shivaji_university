import { all } from "redux-saga/effects";
import SettingsSaga from "./settings/Settings";
import HeaderSaga from "./settings/Header";
import HeroSaga from "./home/Hero";
import FacultySaga from "./home/Faculty";
import ExternalLogosSaga from "./home/ExternalLogos";
import YoutubeVideoSaga from "./home/YoutubeVideo";
import LatestNewsSaga from "./home/LatestNews";
 
export function* rootSaga() {
  yield all([
     SettingsSaga(),
     HeaderSaga(),
     HeroSaga(),
     FacultySaga(),
     ExternalLogosSaga(),
     YoutubeVideoSaga(),
     LatestNewsSaga()
  ]);
}