import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.detail);
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  function contenido() {
    if (cargando) {
      return <Spinner />;
    }
    return (
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
              {myRecipe[0]?.createdInBd
                ? myRecipe[0]?.diets.map((e, index) => (
                    <span key={index}>{e.name} </span>
                  ))
                : myRecipe[0]?.diets
                ? myRecipe[0]?.diets.map((e, index) => (
                    <span key={index}>{e} </span>
                  ))
                : "Sin Dietas provistas por la API"}
              <h2>Puntuacio de Receta y Salud</h2>
              {myRecipe[0]?.puntuacion === undefined ? (
                <span>Puntuacion: {Math.floor(Math.random() * 100) + 1}</span>
              ) : (
                <span>Puntuacion:{myRecipe[0].puntuacion}</span>
              )}
              <span style={{ marginLeft: "8px" }}>
                healthScore: {myRecipe[0]?.healthScore}
              </span>
              <h2>Dish Types: </h2>

              {myRecipe[0]?.createdInBd ? (
                <span>{myRecipe[0]?.dishTypes}</span>
              ) : (
                myRecipe[0]?.dishTypes?.map((e, index) => (
                  <span key={index}>{e}</span>
                ))
              )}
            </div>
          </div>
          <div className="detail-conteiner">
            <div className="detail-right">
              <h2>Summary</h2>
              <span
                dangerouslySetInnerHTML={{ __html: myRecipe[0]?.summary }}
              />
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
            <button
              style={{ width: "95%" }}
              onClick={handleClick}
              className="b1"
            >
              Volver
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return <>{contenido()}</>;
};
export default Detail;
