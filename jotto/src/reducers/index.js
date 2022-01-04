import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./successReducer";

export default combineReducers({
  success,
  guessedWords
})