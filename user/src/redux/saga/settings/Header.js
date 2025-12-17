import { call, put, takeLatest } from "redux-saga/effects";
import { headerActions } from "../../reducer/slice/settings/getHeaderCoursesSlice";
import { SettingsApi } from "../../../api/settings/Settings";

function* getHeaderCourses(action) {
    try {
        const response = yield call(SettingsApi.getHeaderCourses, action.payload);
        yield put(headerActions.success(response.data));
    } catch (error) {
           yield put(headerActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* HeaderSaga() {
    yield takeLatest(headerActions.getHeaderCouses.type, getHeaderCourses);
    // yield takeLatest(settingsActions.refreshLogin.type, refreshLogin);
}
