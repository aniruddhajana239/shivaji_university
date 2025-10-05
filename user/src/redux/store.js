import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./saga/rootSaga";
import rootReducer from "./reducer/slice/rootReducer";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
