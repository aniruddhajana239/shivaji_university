import { call, put, takeLatest } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { NewsActions } from "../../reducer/slice/home/news";

function* getNews(action) {
    try {
        const response = yield call(ContentApi.getContentDetails, action.payload);
        yield put(NewsActions.success(response.data));
    } catch (error) {
           yield put(NewsActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* NewsSaga() {
    yield takeLatest(NewsActions.getAll.type, getNews);
}
