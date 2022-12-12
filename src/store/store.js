import { legacy_createStore as createStore } from 'redux';
import {reducer} from "./reducers/reducer_1";

const store = createStore(reducer);

export default store;