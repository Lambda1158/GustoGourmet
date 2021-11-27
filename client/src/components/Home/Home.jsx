import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getRecipes } from "../../actions";
import { Spiner } from "../spiner";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Searchbar from "../Searchbar/Searchbar";
import "./home.css"

export default function Home(){
    const [orden,setOrden]=useState("")
    const [buscar,setBuscar]=useState("")
    const dispatch=useDispatch()
    var allRecipes=useSelector((state)=> state.recipe)
    var cargando=useSelector(state=>state.cargando)
    
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
    function contenido(){
      if(cargando){
        return <Spiner/>
      }
      return (
        currentRecipe?.map((receta)=>{
          return <Card createdInBd={receta.createdInBd} id={receta.id} title={receta.title} image={receta.image} diets={receta.diets} puntuacion={receta.puntuacion} />
      })
      )
    }
   
    
    return (
        <div className="home-background">
            <Searchbar paginado={setCurrentPage} setOrden={setOrden} />
            <label className="label" htmlFor="title">Buscar por nombre </label>
            <div className="box">
            <input
              className="input"
              type="text"
              id="receta"
              autoComplete="off"
              placeholder="Recipe..."
              value={buscar}
              onChange={(e) => handleCange(e)}
            />
          <button className="buscar" onClick={e=> handleClick(e)}>Search</button>
            </div>
          
          {allRecipes.length>9?
          <Paginado recipePerPage={recipePerPage} allRecipes={allRecipes.length} paginado={paginado}/>
          :<div className="nopagina">Single page</div>}

            <div className="grid">
          {contenido()}
            </div>
          
        </div>
    )
}