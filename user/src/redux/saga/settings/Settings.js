import { call, put, takeLatest } from "redux-saga/effects";
import { settingsActions } from "../../reducer/slice/settings/settingsSlice";
import { SettingsApi } from "../../../api/settings/Settings";

function* getHeader(action) {
    try {
        const response = yield call(SettingsApi.getHeader, action.payload);
        yield put(settingsActions.success(response.data));
    } catch (error) {
           yield put(settingsActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* SettingsSaga() {
    yield takeLatest(settingsActions.getHeader.type, getHeader);
    // yield takeLatest(settingsActions.refreshLogin.type, refreshLogin);
}
