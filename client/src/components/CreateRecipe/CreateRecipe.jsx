import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./createrecipe.css";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { BsFillImageFill } from "react-icons/bs";

export default function CreateRecipe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (aux && input.dishTypes.length < 4) {
      setInput({
        ...input,
        dishTypes: [...input.dishTypes, aux],
        dishtext: "",
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.diet.length === 0) {
      return alert("Debe elegir al menos una Dieta");
    }
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
    dispatch(postRecipe(testfb));
    alert("Recipe creada , anda a buscarla al home :D");
    navigate("/home");
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
    <>
      <div className="form-principal">
        <h1>Crear Nueva Receta </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="divisor">
            <div className="input-dieta">
              <div className="c2">
                <div className="contenedor-inputs">
                  {formfield.map((e, index) => {
                    return (
                      <div key={index}>
                        <label htmlFor={e.label}>{e.label}</label>
                        <input
                          id={e.label}
                          onChange={handleChange}
                          value={input[e.name]}
                          name={e.name}
                          type={e.type}
                          key={index}
                          required
                          autoComplete="off"
                          {...(e.type === "number" ? { min: 0, max: 100 } : {})}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="contenedor-imagen">
                  <label htmlFor="imagen">
                    <BsFillImageFill
                      className="custom-file-upload"
                      htmlFor="imagen"
                    ></BsFillImageFill>
                  </label>
                  <input
                    id="imagen"
                    type="file"
                    name="image"
                    onChange={handleFile}
                  />
                  {imageURL && (
                    <div>
                      <img src={imageURL} alt="Previsualización" width="200" />
                    </div>
                  )}
                </div>
              </div>
              <h1>Lista de Dietas </h1>
              <div className="opciones">
                {diets.map((e, index) => (
                  <div key={index} className="opciones-items">
                    <label htmlFor={e}>{e}</label>
                    <input
                      id={e}
                      key={e}
                      type="checkbox"
                      value={e}
                      name={e}
                      onChange={(e) => handleCheck(e)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="dish">
              <h1>DishType</h1>
              <input
                style={{ marginRight: "10px" }}
                type="text"
                value={input.dishtext}
                name="dishtext"
                onChange={(e) => handleChange(e)}
              />
              <button
                style={{ marginBottom: "20px" }}
                className="b1"
                onClick={(e) => handleDish(e)}
              >
                Push dish
              </button>
              {input.dishTypes.map((e, index) => {
                return (
                  <div key={index}>
                    <span style={{ marginRight: "10px" }}>{e}</span>
                    <button
                      style={{ marginBottom: "10px" }}
                      name="dishTypes"
                      className="b1"
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
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button className="b1" type="submit">
              Post Receta
            </button>
            <Link to="/home">
              <button className="b1">Volver</button>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
