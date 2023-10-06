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
      <div className="detail-background">
        {myRecipe[0] ? (
          <div>
            <h1>{myRecipe[0].title}</h1>
            <img
              src={myRecipe[0].image}
              alt="no cargo :c"
              height="400px"
              width="400px"
            />
            <h2>
              {myRecipe[0].createdInBd
                ? myRecipe[0].diets.map((e) => e.name + " ")
                : myRecipe[0].diets
                ? myRecipe[0].diets.map((e) => e + " ")
                : "dietas viene null de la api"}
            </h2>
            <ul>
              <li>Puntuacion: {myRecipe[0].puntuacion}</li>
              <li>healthScore: {myRecipe[0].healthScore}</li>
            </ul>
            <h3>
              Dish Types:{" "}
              {myRecipe[0].createdInBd
                ? myRecipe[0].dishTypes
                : myRecipe[0].dishTypes?.map((e) => e + " ")}
            </h3>
            <h2>Summary</h2>
            <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} />
            <p>
              Step by Step:{" "}
              {myRecipe[0].createdInBd
                ? myRecipe[0].step
                : myRecipe[0].analyzedInstructions.map((e) => e + "  ")}
            </p>
          </div>
        ) : (
          <p>Loading ...</p>
        )}
        <button onClick={handleClick} className="btn">
          take me back
        </button>
        <Footer />
      </div>
    );
  }

  return <>{contenido()}</>;
};
export default Detail;
