import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./card.css";
import { deleteRecipe } from "../../actions";
export default function Card({
  title,
  image,
  diets,
  healthScore,
  id,
  createdInBd,
  dishTypes,
}) {
  const dispatch = useDispatch();
  function handleDelete(e) {
    dispatch(deleteRecipe(e.target.value));
  }
  if (typeof diets[0] === "object") {
    diets = diets.map((e) => e.name);
  }

  const Dishes = (dishTypes) => {
    if (dishTypes) {
      return Array.isArray(dishTypes) ? (
        dishTypes.map((e, index) => <span key={index}> {e}</span>)
      ) : (
        <span> {dishTypes}</span>
      );
    }
    return <p> No hay Dishes</p>;
  };
  return (
    <div className="cuerpo">
      <h3 className="titulo">{title}</h3>
      <button value={id} className="close" onClick={(e) => handleDelete(e)}>
        X
      </button>

      <div className="card">
        <img className="img" src={image} alt="img not found" />
        <div className="card-content">
          <span className="puntuacion">Puntuacion: {healthScore} </span>
          <div className="dietas">
            Dietas:
            {diets.length > 0 ? (
              diets.map((e, index) => {
                return (
                  <span key={index} className="relleno-card">
                    {e}
                  </span>
                );
              })
            ) : (
              <span> no tengo dietas </span>
            )}
          </div>
          <div className="dishes"> Dishes: {Dishes(dishTypes)}</div>
        </div>
      </div>
      <div className="boton">
        <Link className="link" to={`/detail/${id}${createdInBd ? "b" : "a"}`}>
          <button className="info">More Info</button>
        </Link>
      </div>
    </div>
  );
}
