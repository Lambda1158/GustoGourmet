import React from "react";
import { Link } from "react-router-dom";
import {
  filterBySource,
  filterRecipeByDiets,
  orderByName,
  orderByPuntuacion,
  getDiets,
} from "../../actions";
import "./searchbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Searchbar({ paginado, setOrden }) {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  function handleFilterRecipe(e) {
    dispatch(filterRecipeByDiets(e.target.value));
    paginado(1);
  }
  function handleFilterBySource(e) {
    dispatch(filterBySource(e.target.value));
    paginado(1);
  }
  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    paginado(1);
    setOrden(`Orden ${e.target.value}`);
  }
  function handleSortByPuntuacion(e) {
    e.preventDefault();
    dispatch(orderByPuntuacion(e.target.value));
    paginado(1);
    setOrden(`Orden ${e.target.value}`);
  }
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  return (
    <nav className="nav">
      <div>
        <Link to="/">
          <h1 className="title-home">Gusto Gourmet</h1>
        </Link>
      </div>
      <div className="select-items">
        <div>
          <select
            id="puntuacion"
            onChange={(e) => {
              handleSortByPuntuacion(e);
            }}
          >
            <option id="mas-puntuados" value="mayor">
              Mas puntuados
            </option>
            <option id="menos-puntuados" value="menor">
              Menos puntuados
            </option>
          </select>
        </div>
        <div>
          <select
            id="byname"
            onChange={(e) => {
              handleSortByName(e);
            }}
          >
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
          </select>
        </div>
        <div>
          <select
            id="por-origen"
            name="byc"
            className="nav-item "
            onChange={(e) => handleFilterBySource(e)}
          >
            <option value="All">Todos</option>

            <option value="api">Api</option>
            <option value="db">Data base</option>
          </select>
        </div>
        <div>
          <select id="por-dietas" onChange={(e) => handleFilterRecipe(e)}>
            <option type="checkbox" id="All" value="All">
              All
            </option>
            {diets.map((e, index) => {
              return (
                <option
                  type="checkbox"
                  id={e}
                  value={e.toLowerCase()}
                  key={index}
                >
                  {e}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <Link to="/post">
          <h1 className="title-home">Crear Receta</h1>
        </Link>
      </div>
    </nav>
  );
}
