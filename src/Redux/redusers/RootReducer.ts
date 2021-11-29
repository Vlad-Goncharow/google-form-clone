import {combineReducers} from 'redux';
import {createForm} from "./FormReducer";

export const rootReducer = combineReducers ( {
    createForm
} )

export type RootState = ReturnType<typeof rootReducer>