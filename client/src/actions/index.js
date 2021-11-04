import axios from "axios"
 
export const GET_RECIPES="GET_RECIPES" 
export const FILTER_BY_DIETS="FILTER_BY_DIETS"
export const FILTER_BY_SOURCE="FILTER_BY_SOURCE"
export const ORDER_BY_NAME="ORDER_BY_NAME"
export const ORDER_BY_PUNTUACION="ORDER_BY_PUNTUACION"


 
export function getRecipes(name){
    return function(dispatch) {
        axios.get(`http://localhost:3000/api/recipe?name=${name}`)
        .then((recipe) => {
            
            dispatch({
                type: GET_RECIPES,
                payload: recipe.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function filterRecipeByDiets(payload){
    return {
        type : FILTER_BY_DIETS,
        payload
    }
}

export function filterBySource(payload){
    return{
        type: FILTER_BY_SOURCE,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPuntuacion(payload){
    return{
        type: ORDER_BY_PUNTUACION,
        payload
    }
}