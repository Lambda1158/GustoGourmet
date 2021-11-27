import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"

import "./card.css"
import { deleteRecipe } from "../../actions";
export default function Card({title,image,diets,puntuacion,id,createdInBd}){
    const dispatch=useDispatch()
    function handleDelete(e){
        console.log(e.target.value)
        dispatch(deleteRecipe(e.target.value))
    }
    if(typeof diets[0] ==="object"){
        diets=diets.map(e=>e.name)
    }
    return(
        <div className="card">
            <img className="img" src={image} alt="img not found"  />
            <div className="body">
            <h2 className="header" >{title}</h2>
            {diets[0]?
            <div className="diet"> Dietas : 
            {diets?.map(e=>{
                return <h4>{e}</h4>
            })}
            </div>
            :<span>Sin dieta</span>
            }
            <p >Puntuacion: {puntuacion}</p>
           
            <Link className="link" to={`/detail/${id},${createdInBd?1:0}`}><button class="btn">More info</button></Link>
            <button value={id} class="btn btn-outline" onClick={e=>handleDelete(e)}>X</button>
    
            </div>
        </div>
    )
}