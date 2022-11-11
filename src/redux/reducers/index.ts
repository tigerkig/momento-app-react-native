
import { combineReducers } from "redux";
import { UserReducer } from "./userReducer";
import {PlayDeckReducer} from "./playDeckReducer"

const rootReducer = combineReducers({
    userReducer: UserReducer,
    isSavePlayDeck: PlayDeckReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer};