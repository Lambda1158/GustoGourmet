import React from "react";
import "./paginado.css"
export default function Paginado({ recipePerPage, allRecipes, paginado }) {
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allRecipes / recipePerPage); i++) {
        pageNumbers.push(i + 1)
    }
    if (pageNumbers.length < 2) {
        return <></>
    }
    return (
        <nav>
            <ul className="paginado">
                {pageNumbers.map(number => {
                    return <button key={number} className="pagina-btn" onClick={() => paginado(number)}>{number}</button>
                })}
            </ul>
        </nav>
    )
}