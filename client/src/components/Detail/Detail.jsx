import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailApi, getDetailDB, resetRecipeDetail } from "../../actions";
import { useEffect } from "react";
import "./detail.css";
import Spinner from "../Spiner/spinner";
import Footer from "../Footer/Footer";
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  var cargando = useSelector((state) => state.cargando);

  useEffect(() => {
    id.includes("a")
      ? dispatch(getDetailApi(id.replace(new RegExp("a", "g"), "")))
      : dispatch(getDetailDB(id.replace(new RegExp("b", "g"), "")));
    return () => {
      dispatch(resetRecipeDetail());
    };
  }, [dispatch, id]);
  const myRecipe = useSelector((state) => state.detail);
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  const Dietas = () => {
    if (myRecipe[0]?.createdInBd)
      return <span> {myRecipe[0]?.diets.map((e) => e.name)}</span>;

    return myRecipe[0]?.diets.length === 0 ? (
      <span>No tengo Dietas 😥</span>
    ) : (
      <span> {myRecipe[0]?.diets.map((e) => e)}</span>
    );
  };
  function formatearCadena(cadena) {
    return cadena ? cadena.replace(/,/g, " ") : <></>;
  }
  const Dishes = () => {
    if (myRecipe[0]?.createdInBd)
      return myRecipe[0]?.dishTypes ? (
        <span>{formatearCadena(myRecipe[0]?.dishTypes)} </span>
      ) : (
        <span>No tengo Dishes 😥</span>
      );
    return myRecipe[0]?.dishTypes.length === 0 ? (
      <span>No tengo Dishes 😥</span>
    ) : (
      <div className="spandishtype">
        {myRecipe[0]?.dishTypes.map((e, index) => (
          <span key={index}>{e}</span>
        ))}
      </div>
    );
  };
  return cargando ? (
    <>
      <Spinner />
      <Footer />
    </>
  ) : (
    <>
      <div className="detail-background">
        <h1>{myRecipe[0]?.title}</h1>
        <div className="detail-foto-puntuacion">
          <img
            className="detail-img"
            src={myRecipe[0]?.image}
            alt="no cargo :c"
            height="400px"
            width="400px"
          />
          <div className="detail-puntos">
            <h2>Dietas de la Receta</h2>
            {Dietas()}
            <h2>Puntuacio de Receta y Salud</h2>
            {myRecipe[0]?.puntuacion === undefined ? (
              <span>
                Puntuacion: {Math.floor(Math.random() * 100) + 1} HealthScore:{" "}
                {myRecipe[0]?.healthScore}
              </span>
            ) : (
              <span>
                Puntuacion:{myRecipe[0].puntuacion} HealthScore:{" "}
                {myRecipe[0]?.healthScore}
              </span>
            )}
            <h2>Dish Types: </h2>
            {Dishes()}
          </div>
        </div>
        <div className="detail-conteiner">
          <div className="detail-right">
            <h2>Summary</h2>
            <span dangerouslySetInnerHTML={{ __html: myRecipe[0]?.summary }} />
          </div>
          <div className="detail-left">
            <h2>Pasos a seguir </h2>
            <div>
              {myRecipe[0]?.createdInBd ? (
                <span>{myRecipe[0]?.step}</span>
              ) : (
                myRecipe[0]?.analyzedInstructions.map((e, index) => (
                  <span key={index}>{e}</span>
                ))
              )}
            </div>
          </div>
        </div>
        <div style={{ width: "95%", textAlign: "center" }}>
          <button style={{ width: "95%" }} onClick={handleClick} className="b1">
            Volver
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Detail;
