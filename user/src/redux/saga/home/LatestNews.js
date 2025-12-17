import { call, put, takeLatest } from "redux-saga/effects";
import { HomeApi } from "../../../api/home/HomeApi";
import { latestNewsActions } from "../../reducer/slice/home/latestNewsSlice";

function* getLatestNews(action) {
    try {
        console.log("calling saga")
        const response = yield call(HomeApi.getLatestNews, action.payload);
        yield put(latestNewsActions.success(response.data));
    } catch (error) {
           yield put(latestNewsActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* LatestNewsSaga() {
    yield takeLatest(latestNewsActions.getLatestNews.type, getLatestNews);
}
