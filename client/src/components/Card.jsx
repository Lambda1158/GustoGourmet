import React from "react";
import { Link } from "react-router-dom";
import "./css/card.css"
export default function Card({title,image,diets,puntuacion,id,createdInBd}){
    if(typeof diets[0] ==="object"){
        diets=diets.map(e=>e.name)
    }
    return(
        <div>
            <h2>{title}</h2>
            <img src={image} alt="img not found" height="200px" width="200px" />
            {diets?.map(e=>{
                return <p>{e}</p>
            })}
            <p>Puntuacion: {puntuacion}</p>
            <Link className="link" to={`/detail/${id},${createdInBd?1:0}`}>more info</Link>
        </div>
    )
}