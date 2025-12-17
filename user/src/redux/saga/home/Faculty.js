import { call, put, takeLatest } from "redux-saga/effects";
import { facultiesActions } from "../../reducer/slice/home/facultiesSlice";
import { HomeApi } from "../../../api/home/HomeApi";

function* getFaculties(action) {
    try {
        const response = yield call(HomeApi.getFaculties, action.payload);
        yield put(facultiesActions.success(response.data));
    } catch (error) {
           yield put(facultiesActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* FacultySaga() {
    yield takeLatest(facultiesActions.getFaculties.type, getFaculties);
}
