import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"

import "./css/card.css"
import { deleteRecipe } from "../actions";
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
            <img className="img" src={image} alt="img not found" height="200px" width="200px" />
            <h2 className="header" >{title}</h2>
            <div className="body">
            <br></br>
            {diets[0]?
            <ul> Dietas : 
            {diets?.map(e=>{
                return <li>{e}</li>
            })}
            </ul>
            :<span>Sin dieta</span>
            }
            <p>Puntuacion: {puntuacion}</p>
            </div>
            <div className="footer">
            <Link className="link" to={`/detail/${id},${createdInBd?1:0}`}><button class="btn">More info</button></Link>
            <button value={id} class="btn btn-outline" onClick={e=>handleDelete(e)}>X</button>
            </div>
        </div>
    )
}