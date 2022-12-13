
const defoultState = {
    output: "",
    visible: false
}

export const UPDATE_OUTPUT = "UPDATE_OUTPUT"
export const MAKE_VISIBLE = "MAKE_VISIBLE"
export const MAKE_UNVISIBLE = "MAKE_UNVISIBLE"

export function reducer(state = defoultState, action) {
    switch(action.type) {
        case UPDATE_OUTPUT: return { ...state, output: action.output};
        case MAKE_VISIBLE: return {...state, visible: true};    
        case MAKE_UNVISIBLE: return {...state, visible: false};     
        default: return state;
    } 
}
