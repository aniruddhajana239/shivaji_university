import { call, put, takeLatest } from "redux-saga/effects";
import { HomeApi } from "../../../api/home/HomeApi";
import { youtubeVideoActions } from "../../reducer/slice/home/youtubeVideoSlice";

function* getYoutubeVideo(action) {
    try {
        console.log("calling saga")
        const response = yield call(HomeApi.getYoutubeVideo, action.payload);
        yield put(youtubeVideoActions.success(response.data));
    } catch (error) {
           yield put(youtubeVideoActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* YoutubeVideoSaga() {
    yield takeLatest(youtubeVideoActions.getYoutubeVideo.type, getYoutubeVideo);
}
