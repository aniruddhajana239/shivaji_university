import { combineReducers } from "@reduxjs/toolkit";
import { settingsReducers } from "./settings/settingsSlice";
import { headerReducers } from "./settings/getHeaderCoursesSlice";
import { heroReducers } from "./home/heroSlice";
import { facultiesReducers } from "./home/facultiesSlice";
import { externalLogosReducers } from "./home/externalLogosSlice";
import { youtubeVideoReducers } from "./home/youtubeVideoSlice";
import { latestNewsReducers } from "./home/latestNewsSlice";
import { menuReducers } from "./settings/getMenuListSlice";
import { HomeReducers } from "./home/homeSlice";


export const rootReducers = combineReducers({
  settings: settingsReducers,
  header:headerReducers,
  hero:heroReducers,
  faculties:facultiesReducers,
  externalLogos:externalLogosReducers,
  youtubeVideo:youtubeVideoReducers,
  latestNews:latestNewsReducers,
  menu:menuReducers,
  home:HomeReducers,
});
