import React from "react";

export default function Paginado({recipePerPage,allRecipes,paginado}){
    const pageNumbers=[]
    for(let i=0; i<Math.ceil(allRecipes/recipePerPage);i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul className="paginado">
            {pageNumbers&&pageNumbers.map(number=>{
                return    <li className="number" key={number}><button onClick={()=>paginado(number)}>{number}</button></li>
            })}
            </ul>
        </nav>
    )
}