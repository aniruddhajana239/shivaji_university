import { call, put, takeLatest } from "redux-saga/effects";
import { HomeApi } from "../../../api/home/HomeApi";
import { externalLogosActions } from "../../reducer/slice/home/externalLogosSlice";

function* getExternalLogos(action) {
    try {
        const response = yield call(HomeApi.getExternalLogos, action.payload);
        yield put(externalLogosActions.success(response.data));
    } catch (error) {
           yield put(externalLogosActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* ExternalLogosSaga() {
    yield takeLatest(externalLogosActions.getExternalLogos.type, getExternalLogos);
}
