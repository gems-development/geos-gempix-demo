
const defoultState = {
    output: "Privet",
    visible: true
}
export function reducer(state = defoultState, action) {
    switch(action.type) {
        case "updateOutput": return { ...state, output: action.output, visible: true};
        case "makeVisible": return {...state, visible: true};    
        case "makeUnVisible": return {...state, visible: false};     
        default: return state;
    }
}