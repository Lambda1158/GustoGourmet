import React from "react";
import { Link } from "react-router-dom";
import { filterBySource, filterRecipeByDiets, orderByName, orderByPuntuacion } from "../actions";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
export default function Searchbar( {paginado,setOrden}){

    

    const dispatch=useDispatch()
    function handleFilterRecipe(e){
        dispatch(filterRecipeByDiets(e.target.value))
    }
    function handleFilterBySource(e){
        dispatch(filterBySource(e.target.value))
    }
    function handleSortByName(e){
        
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        paginado(1)
        setOrden(`Orden ${e.target.value}`)
    }
    function handleSortByPuntuacion(e){
        
        e.preventDefault()
        dispatch(orderByPuntuacion(e.target.value))
        paginado(1)
        setOrden(`Orden ${e.target.value}`)
    }





    return (
        <div>
            <h1>La nav bar</h1>
            <Link to="/">take me back to Landingpage</Link>
            <select  onChange={(e)=>{handleSortByPuntuacion(e)}}>
                <option value="mayor">Mas puntuados</option>
                <option value="menor">Menos puntuados</option>
            </select>
            <select  onChange={(e)=>{handleSortByName(e)}}>
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <select name="byc" onChange={e=>handleFilterBySource(e)}>
                <option value="All">Todos</option>
                <option value="api">Api</option>
                <option value="db">Data base</option>
            </select>
            <select onChange={(e)=>handleFilterRecipe(e)}>
                <option type="checkbox" id="All" value="All">All</option>
                <option type="checkbox" id="vegan" value="vegan">Vegan</option>
                <option type="checkbox" id="vegetarian" value="vegetarian" >Vegetarian</option>
                <option type="checkbox" id="Gluten Free" value="gluten free" >Gluten Free</option>
                <option type="checkbox" id="Ketogenic" value="ketogenic">Ketogenic</option>
                <option type="checkbox" id="Lacto-Vegetarian" value="lacto-vegetarian">Lacto-Vegetarian</option>
                <option type="checkbox" id="Ovo-Vegetarian" value="ovo" >Ovo-Vegetarian</option>
                <option type="checkbox" id="pescatarian" value="pescatarian">Pescatarian</option>
                <option type="checkbox" id="Paleo" value="paleo" >Paleo</option>
                <option type="checkbox" id="Primal" value="primal" >Primal</option>
                <option type="checkbox" id="Low-FODMAP" value="low-FODMAP" >Low-FODMAP</option>
                <option type="checkbox" id="Whole30" value="whole30">Whole30</option>
                <option type="checkbox" id="Dairy Free" value="dairy free">Dairy Free</option>
                <option type="checkbox" id="lacto ovo vegetarian" value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            </select>
        </div>
        
    )
}