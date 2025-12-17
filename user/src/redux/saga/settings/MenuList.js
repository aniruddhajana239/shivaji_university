import { call, put, takeLatest } from "redux-saga/effects";
import { SettingsApi } from "../../../api/settings/Settings";
import { menuActions } from "../../reducer/slice/settings/getMenuListSlice";

function* getMenuList(action) {
    try {
        const response = yield call(SettingsApi.getMenuList, action.payload);
        yield put(menuActions.success(response.data));
    } catch (error) {
           yield put(menuActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* MenusSaga() {
    yield takeLatest(menuActions.getMenus.type, getMenuList);
    // yield takeLatest(settingsActions.refreshLogin.type, refreshLogin);
}
