import {createStore} from "redux"
import demo from './reducers'

var store = createStore(demo)


console.log(store.getState())
export default store