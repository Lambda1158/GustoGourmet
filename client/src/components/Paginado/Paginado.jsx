import React from "react";
import "./paginado.css";
export default function Paginado({ recipePerPage, allRecipes, paginado }) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipePerPage); i++) {
    pageNumbers.push(i + 1);
  }
  if (pageNumbers.length < 2 || allRecipes === 0) {
    return <></>;
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers.map((number) => {
          return (
            <button
              key={number}
              className="b1 bpagina"
              onClick={() => paginado(number)}
              style={{ marginBottom: "5px", borderRadius: "30%" }}
            >
              {number}
            </button>
          );
        })}
      </ul>
    </nav>
  );
}
