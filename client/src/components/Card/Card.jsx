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
        dishTypes.map((e, index) => <p key={index}>{e}</p>)
      ) : (
        <p>{dishTypes}</p>
      );
    }
    return <p> No hay Dishes</p>;
  };
  return (
    <div className="card">
      <img className="img" src={image} alt="img not found" />
      <div className="card-content">
        <h3>{title}</h3>
        <p className="relleno-card">Puntuacion: {healthScore} </p>
        {diets ? (
          diets.map((e, index) => {
            return (
              <p key={index} className="relleno-card">
                {e}
              </p>
            );
          })
        ) : (
          <p className="relleno-card" key={id}>
            No Diets :P
          </p>
        )}
        {Dishes(dishTypes)}

        <div className="btn-container">
          <Link className="link" to={`/detail/${id}${createdInBd ? "b" : "a"}`}>
            <button className="btn btn-primary">More info</button>
          </Link>
          <button
            value={id}
            className="btn btn-secondary"
            onClick={(e) => handleDelete(e)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
