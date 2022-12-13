import {UPDATE_OUTPUT, MAKE_UNVISIBLE, MAKE_VISIBLE } from "../reducers/reducer_1"


export const updateOutputAction = (text) => ({type: UPDATE_OUTPUT, output: text})
export const makeVisibleAction = () => ({type: MAKE_VISIBLE})
export const makeUnVisibleAction = () => ({type: MAKE_UNVISIBLE})