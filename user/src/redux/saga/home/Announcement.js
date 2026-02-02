import { call, put, takeLatest } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { AnnouncementActions } from "../../reducer/slice/home/announcement";

function* getAnnouncement(action) {
    try {
        const response = yield call(ContentApi.getContentDetails, action.payload);
        yield put(AnnouncementActions.success(response.data));
    } catch (error) {
           yield put(AnnouncementActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* AnnouncementSaga() {
    yield takeLatest(AnnouncementActions.getAll.type, getAnnouncement);
}
