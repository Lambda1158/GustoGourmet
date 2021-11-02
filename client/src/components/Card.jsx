import React from "react";

export default function Card({name,image,diets}){
    if(typeof diets[0] ==="object"){
        diets=diets.map(e=>e.name)
    }
    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt="img not found" height="200px" width="200px" />
            {diets?.map(e=>{
                return <p>{e}</p>
            })}
        </div>
    )
}