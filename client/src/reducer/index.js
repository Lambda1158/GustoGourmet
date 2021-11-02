import {GET_RECIPES} from "../actions/index"

const initialState={
    recipe:[],
    probando:[]

}

export default function rootReducer(state=initialState,action){
    switch(action.type) {
        case GET_RECIPES:
            console.log(action.payload)
            return {
                ...state,
                recipe:action.payload
            }
        
        default:
            return state
    }

}