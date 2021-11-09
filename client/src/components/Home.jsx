import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import Searchbar from "./Searchbar";

export default function Home(){
    const [orden,setOrden]=useState("")
    const [buscar,setBuscar]=useState("")
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

    // useEffect(()=>{
    //     dispatch(getRecipes("milanesa"))
        
    // },[])
    
    function handleCange(e){
        e.preventDefault()
        setBuscar(e.target.value)
    }
    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes(buscar))
        setBuscar("")

    }
   
    
    return (
        <div>
            <Searchbar paginado={setCurrentPage} setOrden={setOrden} />
            <Link to="/post">Crear Receta</Link>
            <label className="label" htmlFor="title">Nombre de receta </label>
            <input
              type="text"
              id="receta"
              autoComplete="off"
              placeholder="Buscar..."
              value={buscar}
              onChange={(e) => handleCange(e)}
            />
          <button onClick={e=> handleClick(e)}>BUSCAR</button>
          <Paginado recipePerPage={recipePerPage} allRecipes={allRecipes.length} paginado={paginado}/>

          {currentRecipe?.map((receta)=>{
              return <Card createdInBd={receta.createdInBd} id={receta.id} title={receta.title} image={receta.image} diets={receta.diets} puntuacion={receta.puntuacion} />
          })}
          
        </div>
    )
}