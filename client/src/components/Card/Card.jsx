import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"

import "./card.css"
import { deleteRecipe } from "../../actions";
export default function Card({title,image,diets,puntuacion,id,createdInBd}){
    const dispatch=useDispatch()
    function handleDelete(e){
        dispatch(deleteRecipe(e.target.value))
    }
    if(typeof diets[0] ==="object"){
        diets=diets.map(e=>e.name)
    }
    return(
        <div className="card">
            <div className="body">
            <img className="img" src={image} alt="img not found" />
            <h3 className="header" >{title}</h3>
            <span >Puntuacion: {puntuacion} </span>
            {diets?diets.map((e)=>{
                return <p>{e}</p>
            }):<p>No Diets :P</p>}
           
            <Link className="link" to={`/detail/${id},${createdInBd?1:0}`}><button class="btn">More info</button></Link>
            <button value={id} class="btn btn-outline" onClick={e=>handleDelete(e)}>X</button>
    
            </div>
        </div>
       

    )
}