import { call, put, takeLatest } from "redux-saga/effects";
import { HomeApi } from "../../../api/home/HomeApi";
import { heroActions } from "../../reducer/slice/home/heroSlice";

function* getBanners(action) {
    try {
        const response = yield call(HomeApi.getBanners, action.payload);
        yield put(heroActions.success(response.data));
    } catch (error) {
           yield put(heroActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* HeroSaga() {
    yield takeLatest(heroActions.getBanners.type, getBanners);
    // yield takeLatest(settingsActions.refreshLogin.type, refreshLogin);
}
