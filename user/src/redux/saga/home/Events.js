import { call, put, takeLatest } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { EventsActions } from "../../reducer/slice/home/events";

function* getEvents(action) {
    try {
        const response = yield call(ContentApi.getContentDetails, action.payload);
        yield put(EventsActions.success(response.data));
    } catch (error) {
           yield put(EventsActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* EventsSaga() {
    yield takeLatest(EventsActions.getAll.type, getEvents);
}
