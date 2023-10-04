import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe, getRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./createrecipe.css";
import { useEffect } from "react";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    name: "",
    title: "",
    summary: "",
    puntuacion: 0,
    step: "",
    diet: [],
    healthScore: 0,
    dishtext: "",
    dishTypes: [],
  });
  const formfield = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Titulo", name: "title", type: "text" },
    { label: "Sumary", name: "summary", type: "text" },
    { label: "Puntuacion", name: "puntuacion", type: "number" },
    { label: "Paso a paso", name: "step", type: "text" },
    { label: "Saludable", name: "healthScore", type: "number" },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  function handleCheck(e) {
    setInput({
      ...input,
      diet: [...input.diet, e.target.value],
    });
  }
  function handleDish(e) {
    e.preventDefault();
    let aux = input.dishtext;
    setInput({
      ...input,
      dishTypes: [...input.dishTypes, aux],
      dishtext: "",
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let testfb = new FormData();
    testfb.append("name", input.name);
    testfb.append("title", input.title);
    testfb.append("summary", input.summary);
    testfb.append("puntuacion", input.puntuacion);
    testfb.append("step", input.step);
    testfb.append("diet", input.diet);
    testfb.append("healthScore", input.healthScore);
    testfb.append("dishtext", input.dishtext);
    testfb.append("dishTypes", input.dishTypes);
    testfb.append("image", file);
    console.log(testfb);
    dispatch(postRecipe(testfb));
    alert("Recipe creada , anda a buscarla al home :D");
    dispatch(getRecipes(input.name));
    history.push("/home");
  }
  function pop(btn, e) {
    btn.preventDefault();
    setInput({
      ...input,
      [btn.target.name]: input[btn.target.name].filter((dish) => dish !== e),
    });
  }
  function handleFile(e) {
    setFile(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(imageURL);
  }
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  return (
    <div className="form-principal">
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Create your own unique recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="c2">
          <div className="contenedor-inputs">
            {formfield.map((e, index) => {
              return (
                <div key={index}>
                  <label>{e.label}</label>
                  <input
                    onChange={handleChange}
                    value={input[e.name]}
                    name={e.name}
                    type={e.type}
                    key={index}
                    required
                    {...(e.type === "number" ? { min: 0, max: 100 } : {})}
                  />
                </div>
              );
            })}
          </div>
          <div className="contenedor-imagen">
            <label>Imagen</label>
            <input type="file" name="image" onChange={handleFile} />
            {imageURL && (
              <div>
                <img src={imageURL} alt="Previsualización" width="200" />
              </div>
            )}
          </div>
        </div>
        <div className="tipoDeDietas">
          <div className="create-recipe">
            <label>Diets:</label>
            <div className="opciones">
              {diets.map((e, index) => (
                <div key={index} className="opciones-items">
                  <input
                    key={e}
                    type="checkbox"
                    value={e}
                    name={e}
                    onChange={(e) => handleCheck(e)}
                  />
                  <label>{e}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="create-recipe">
          <label>DishType</label>
          <br></br>
          <input
            type="text"
            value={input.dishtext}
            name="dishtext"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={(e) => handleDish(e)}>Push dish</button>
          {input.dishTypes.map((e, index) => {
            return (
              <div key={index}>
                <p>{e}</p>
                <button
                  name="dishTypes"
                  onClick={(btn) => {
                    pop(btn, e);
                  }}
                >
                  Eliminar Dish
                </button>
              </div>
            );
          })}
        </div>
        <button className="btn" type="submit">
          POST!
        </button>
      </form>
    </div>
  );
}
