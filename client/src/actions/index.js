import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PUNTUACION = "ORDER_BY_PUNTUACION";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_ID = "GET_BY_ID";
export const DELETE = "DELETE";
export const RESET_RECIPE = "RESET_RECIPE";
export const LOADING = "LOADING";
export const ERROR = "ERROR";

export function getRecipes(name) {
  return function (dispatch) {
    dispatch({
      type: LOADING,
    });
    axios
      .get(`https://recipes-app-486l.onrender.com/recipe?name=${name}`)
      .then((recipe) => {
        dispatch({
          type: GET_RECIPES,
          payload: recipe.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ERROR,
          payload: error.message,
        });
      });
  };
}

export function filterRecipeByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function filterBySource(payload) {
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPuntuacion(payload) {
  return {
    type: ORDER_BY_PUNTUACION,
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      axios({
        method: "post",
        url: "https://recipes-app-486l.onrender.com/recipe",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      //await axios.post(`http://localhost:3000/api/recipe`, payload);
      return dispatch({
        type: POST_RECIPE,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var info = await axios("https://recipes-app-486l.onrender.com/types");
    return dispatch({
      type: GET_DIETS,
      payload: info.data,
    });
  };
}

export function getDetailApi(id) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    var info = await axios(
      `https://recipes-app-486l.onrender.com/recipeApi/id/${id}`
    );

    return dispatch({
      type: GET_BY_ID,
      payload: info.data,
    });
  };
}
export function getDetailDB(id) {
  return async function (dispatch) {
    dispatch({
      type: LOADING,
    });
    var info = await axios(
      `https://recipes-app-486l.onrender.com/recipeDB/id/${id}`
    );

    return dispatch({
      type: GET_BY_ID,
      payload: info.data,
    });
  };
}
export function deleteRecipe(payload) {
  return {
    type: DELETE,
    payload,
  };
}
export function resetRecipeDetail() {
  return {
    type: RESET_RECIPE,
  };
}
