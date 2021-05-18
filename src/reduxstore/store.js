import {createStore, applyMiddleware} from "redux"
import demo from './reducers'
import createSaga from "redux-saga"
// import {logger} from "./middlewares"
import {RootSaga} from "./sagas"

var sagaMiddleware = createSaga()
var middlewares = applyMiddleware(sagaMiddleware)

export default createStore(demo, middlewares)

sagaMiddleware.run(RootSaga)