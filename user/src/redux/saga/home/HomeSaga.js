import { call, put, takeLatest } from "redux-saga/effects";
import { HomeApi } from "../../../api/home/HomeApi";
import { HomeActions } from "../../reducer/slice/home/homeSlice";

function* getAll(action) {
    try {
        const response = yield call(HomeApi.getAll, action.payload);
        yield put(HomeActions.success(response.data));
    } catch (error) {
           yield put(HomeActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* HomeSaga() {
    yield takeLatest(HomeActions.getAll.type, getAll);
}
