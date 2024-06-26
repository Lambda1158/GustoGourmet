import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../actions";
import Spinner from "../Spiner/spinner";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Searchbar from "../Searchbar/Searchbar";
import Footer from "../Footer/Footer";
import "./home.css";
export default function Home() {
  const [orden, setOrden] = useState("");
  const [buscar, setBuscar] = useState("");
  const dispatch = useDispatch();
  var allRecipes = useSelector((state) => state.recipe);
  var cargando = useSelector((state) => state.cargando);
  var error = useSelector((state) => state.error);
  const [currentPage, setCurrentPage] = useState(1);
  const getInitialValue = () => {
    if (window.innerWidth < 1000) {
      return 3;
    } else if (window.innerWidth < 1365) {
      return 6;
    } else {
      return 9;
    }
  };
  const [recipePerPage, setRecipePerPage] = useState(getInitialValue());
  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipe = allRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setRecipePerPage(3);
      } else if (window.innerWidth < 1365) {
        setRecipePerPage(6);
      } else {
        setRecipePerPage(9);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlekey = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) return dispatch(getRecipes(buscar));
  };
  function handleCange(e) {
    e.preventDefault();
    setBuscar(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes(buscar));
  }
  function contenido() {
    if (cargando) {
      return <Spinner />;
    }
    return error ? (
      <div>
        <h1>No hay recetas con ese nombre</h1>
      </div>
    ) : currentRecipe.length === 0 ? (
      <></>
    ) : (
      <div className="grid">
        {currentRecipe?.map((receta, index) => {
          return (
            <Card
              key={index}
              createdInBd={receta.createdInBd}
              id={receta.id}
              title={receta.title}
              image={receta.image}
              diets={receta.diets}
              healthScore={receta.healthScore}
              dishTypes={receta.dishTypes}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="home-background">
      <Searchbar paginado={setCurrentPage} setOrden={setOrden} />
      <div className="box">
        <input
          className="la"
          type="text"
          id="receta"
          autoComplete="off"
          placeholder="Busca tu Receta"
          value={buscar}
          onKeyUp={handlekey}
          onChange={(e) => handleCange(e)}
        />
        <button className="botonhome" onClick={(e) => handleClick(e)}>
          Buscar
        </button>
      </div>
      {contenido()}
      <Paginado
        recipePerPage={recipePerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
      />
      {recipePerPage !== 3 && <Footer />}
    </div>
  );
}
