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
  function formatearCadena(cadena) {
    return cadena ? cadena.replace(/,/g, " ") : <></>;
  }
  const Dishes = (dishTypes) => {
    if (dishTypes) {
      return Array.isArray(dishTypes) ? (
        dishTypes.map((e, index) => <span key={index}> {e}</span>)
      ) : (
        <span> {formatearCadena(dishTypes)}</span>
      );
    }
    return <span> No Tengo Dishes 😥</span>;
  };
  return (
    <div className="cuerpo">
      <h2 className="titulo">{title}</h2>
      <div className="card">
        <img className="img" src={image} alt="img not found" />
        <div className="card-content">
          <p className="puntuacion">HealthScore: {healthScore} </p>
          <div className="dietas">
            Dietas:{" "}
            {diets.length > 0 ? (
              diets.map((e, index) => {
                return (
                  <span key={index} className="relleno-card">
                    {e}
                  </span>
                );
              })
            ) : (
              <span> No tengo dietas 😥 </span>
            )}
          </div>
          <div className="dishes-card"> Dishes: {Dishes(dishTypes)}</div>
        </div>
      </div>
      <div className="boton">
        <div>
          <Link className="link" to={`/detail/${id}${createdInBd ? "b" : "a"}`}>
            <button
              style={{
                backgroundColor: "#c38154",
                fontSize: "15px",
              }}
              className="b1"
            >
              Mas Info
            </button>
          </Link>
        </div>
        <div>
          <button
            value={id}
            style={{ backgroundColor: "#c38154", fontSize: "15px" }}
            className="b1"
            onClick={handleDelete}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
