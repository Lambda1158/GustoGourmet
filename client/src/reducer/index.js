import {FILTER_BY_DIETS, GET_RECIPES,FILTER_BY_SOURCE,ORDER_BY_NAME,ORDER_BY_PUNTUACION} from "../actions/index"

const initialState={
    recipe:[],
    backupAllRecipes:[]

}

export default function rootReducer(state=initialState,action){
    switch(action.type) {
        case GET_RECIPES:
            
            return {
                ...state,
                recipe:action.payload,
                backupAllRecipes:action.payload
            }
        case FILTER_BY_DIETS:
            
            const allRecipe=state.backupAllRecipes
            const dietsFiltered=action.payload === "All"? allRecipe: allRecipe.filter(el=>{
                if(typeof el.diets[0] === "object"){
                    el.diets=el.diets.map(e=>e.name.toLowerCase())
                }else{
                    el.diets=el.diets.map(e=>e.toLowerCase())
                }
                
                if(el.diets.includes(action.payload))return el
            })
            return{
                ...state,
                recipe:dietsFiltered

            }
        case FILTER_BY_SOURCE:
            const allRecipebySource=state.backupAllRecipes
            var recipeSource
            if(action.payload==="All"){
                recipeSource=allRecipebySource
            }else if(action.payload==="db"){
                recipeSource=allRecipebySource.filter(e=>e.createdInBd)
            }else{
                recipeSource=allRecipebySource.filter(e=>!e.createdInBd)
            }
            
        return{
            ...state,
            recipe:recipeSource
        }

        case ORDER_BY_NAME:
            let sortArr = action.payload==="asc" ? 
                state.recipe.sort(function(a,b){
                    if(a.name>b.name){
                        return 1
                    }
                    if(b.name>a.name){
                        return -1
                    }
                    return 0
                })
            
            : state.recipe.sort(function(a,b){
                if(a.name>b.name){
                    return -1
                }
                if(b.name>a.name){
                    return 1
                }
                return 0
            })
              
            return {
                ...state,
                recipe:sortArr
            }
        case ORDER_BY_PUNTUACION:
            console.log(action.payload)
            let sortArr1 = action.payload==="asc" ? 
            state.recipe.sort(function(a,b){
                console.log(a.puntuacion)
                if(a.puntuacion>b.puntuacion){
                    
                    return 1
                }
                if(b.puntuacion>a.puntuacion){
                    return -1
                }
                return 0
            })
        
        : state.recipe.sort(function(a,b){
            if(a.puntuacion>b.puntuacion){
                return -1
            }
            if(b.puntuacion>a.puntuacion){
                return 1
            }
            return 0
        })
            return{
                ...state,
                recipe:sortArr1
            }
        default:
            return state
    }

}