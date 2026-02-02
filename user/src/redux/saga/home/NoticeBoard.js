import { call, put, takeLatest } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { NoticeBoardActions } from "../../reducer/slice/home/NoticeBoard";

function* getNoticeBoard(action) {
    try {
        console.log("Fetching Notice Board with action:", action);
        const response = yield call(ContentApi.getNoticeBoard, action.payload);
        yield put(NoticeBoardActions.success(response.data));
    } catch (error) {
           yield put(NoticeBoardActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* NoticeBoardSaga() {
    yield takeLatest(NoticeBoardActions.getAll.type, getNoticeBoard);
}
