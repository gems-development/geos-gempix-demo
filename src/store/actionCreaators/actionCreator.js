import {UPDATE_OUTPUT, MAKE_UNVISIBLE, MAKE_VISIBLE } from "../reducers/infoWindowReducer"


export const updateOutputAction = (text) => ({type: UPDATE_OUTPUT, output: text})
export const showAction = () => ({type: MAKE_VISIBLE})
export const hideAction = () => ({type: MAKE_UNVISIBLE})