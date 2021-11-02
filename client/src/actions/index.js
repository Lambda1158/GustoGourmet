import axios from "axios"
 
export const GET_RECIPES="GET_RECIPES"

 
export function getRecipes(name){
    return function(dispatch) {
        axios.get(`http://localhost:3000/api/recipe?name=${name}`)
        .then((recipe) => {
            console.log(recipe.data)
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