import { call, put, takeLatest } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { QuickLinksActions } from "../../reducer/slice/home/quickLinks";

function* getQuickLinks(action) {
    try {
        console.log("Fetching Quick Links with action:", action);
        const response = yield call(ContentApi.getQuickLinks, action.payload);
        yield put(QuickLinksActions.success(response.data));
    } catch (error) {
           yield put(QuickLinksActions.failed(error?.response?.data ?? error.message));
    }
}


export default function* QuickLinksSaga() {
    yield takeLatest(QuickLinksActions.getAll.type, getQuickLinks);
}
