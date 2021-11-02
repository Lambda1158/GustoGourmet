import React from "react";

export default function Card({name,image,diets}){
    return(
        <div>
            <h4>{name}</h4>
            <img src={image} alt="img not found" height="200px" width="200px" />
            {diets?.map(e=>{
                return <p>{e.name}</p>
            })}
        </div>
    )
}