import { call, put, takeEvery } from "redux-saga/effects";
import { ContentApi } from "../../../api/content/ContentApi";
import { DynamicCardsActions } from "../../reducer/slice/home/dynamicCardsSlice";

function* getCardDetails(action) {
    const { menu_id } = action.payload;
    try {
        const response = yield call(ContentApi.getContentDetails, { menu_id });
        yield put(DynamicCardsActions.success({ menu_id, data: response.data.data }));
    } catch (error) {
        yield put(DynamicCardsActions.failed({ 
            menu_id, 
            error: error?.response?.data ?? error.message 
        }));
    }
}

export default function* DynamicCardsSaga() {
    yield takeEvery(DynamicCardsActions.getAll.type, getCardDetails);
}
