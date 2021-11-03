import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home(){
    const [buscar,setBuscar]=useState("milanesa")
    const dispatch=useDispatch()
    var allRecipes=useSelector((state)=> state.recipe)
    const [currentPage,setCurrentPage]=useState(1)
    const [recipePerPage,setRecipePerPage]=useState(9)
    const indexOfLastRecipe=currentPage*recipePerPage
    const indexOfFirstRecipe=indexOfLastRecipe-recipePerPage
    const currentRecipe= allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

    const paginado=(pagNumber)=>{
        setCurrentPage(pagNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes("milanesa"))

    },[])
    function handleCange(e){
        e.preventDefault()
        setBuscar(e.target.value)
    }
    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes(buscar))

    }

    
    return (
        <div>
            <Link to="/Cart">Crear Receta</Link>
            <label className="label" htmlFor="title">Nombre de receta </label>
            <input
              type="text"
              id="receta"
              autoComplete="off"
              value={buscar}
              onChange={(e) => handleCange(e)}
            />
          <button onClick={e=> handleClick(e)}>BUSCAR</button>
          <Paginado recipePerPage={recipePerPage} allRecipes={allRecipes.length} paginado={paginado}/>

          {currentRecipe?.map((receta)=>{
              return <Card  name={receta.name} image={receta.image} diets={receta.diets} />
          })}
          
        </div>
    )
}