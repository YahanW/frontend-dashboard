import { combineReducers } from "redux";
import service from "./service";
import user from "./user";

export default combineReducers({
    service,
    user
})