import { combineReducers } from "redux";
import service from "./service";
import user from "./user";
import event from "./event";
export default combineReducers({
    service,
    user,
    event
})