import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe, getRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./createrecipe.css"
import { useEffect } from "react";
import Row from "./Row/Row";

function validateInput(input) {
    var error = {}
    if (!input.name) {
        error.name = "Se requiere un nombre"
    } else if (!input.title) {
        error.title = "Se requiere un titulo"
    } else if (!input.summary) {
        error.summary = "Este campo es obligatorio"
    } else if (!input.puntuacion) {
        error.puntuacion = "Puntuacion del 1 al 100"
    } else if (!input.healthScore) {
        error.healthScore = "Healthscore tiene q ser un numero"
    }

    return error
}

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [error, setError] = useState({})
    const [file, setFile] = useState(null)
    const diets = useSelector(state => state.diets)
    const [input, setInput] = useState({
        name: "",
        title: "",
        summary: "",
        puntuacion: null,
        step: "",
        diet: [],
        healthScore: null,
        dishtext: "",
        dishTypes: [],

    })

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCheck(e) {
        setInput({
            ...input,
            diet: [...input.diet, e.target.value]
        })

    }
    function handleDish(e) {
        e.preventDefault()
        let aux = input.dishtext
        setInput({
            ...input,
            dishTypes: [...input.dishTypes, aux],
            dishtext: ""
        })


    }
    function handleSubmit(e) {
        e.preventDefault()
        let testfb = new FormData()
        testfb.append("name", input.name)
        testfb.append("title", input.title)
        testfb.append("summary", input.summary)
        testfb.append("puntuacion", input.puntuacion)
        testfb.append("step", input.step)
        testfb.append("diet", input.diet)
        testfb.append("healthScore", input.healthScore)
        testfb.append("dishtext", input.dishtext)
        testfb.append("dishTypes", input.dishTypes)
        testfb.append("image", file)
        console.log(testfb)
        dispatch(postRecipe(testfb))
        alert("Recipe creada , anda a buscarla al home :D")
        dispatch(getRecipes(input.name))
        history.push("/home")
    }
    function pop(btn, e) {
        btn.preventDefault()
        setInput({
            ...input,
            [btn.target.name]: input[btn.target.name].filter(dish => dish !== e)
        })
    }
    function handleFile(e) {
        setFile(e.target.files[0])
    }
    useEffect(() => {
        dispatch(getDiets())
    }, [])
    console.log(input)
    return (
        <div className="form-principal">
            <Link to="/home"><button>Volver</button></Link>
            <h1>Create your own unique recipe</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <Row onChange={handleChange} value={input.name} name={"Name"} />
                <Row onChange={handleChange} value={input.title} name={"Title"} />
                <Row onChange={handleChange} value={input.summary} name={"Summary"} />
                <Row onChange={handleChange} value={input.puntuacion} name={"Puntuacion"} />
                <Row onChange={handleChange} value={input.healthScore} name={"healthScore"} />
                <Row onChange={handleChange} value={input.step} name={"Step"} />
                <div className="create-recipe">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFile}
                    />
                </div>
                <div className="tipoDeDietas">
                    <div className="create-recipe">
                        <label>Diets:</label>
                        <div className="opciones">
                            {diets.map((e) => (
                                <div className="opciones-items">
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
                        onChange={e => handleChange(e)}
                    />
                    <button onClick={e => handleDish(e)} >Push dish</button>
                    {input.dishTypes.map(e => {
                        return <><p>{e}</p><button name="dishTypes" onClick={(btn) => { pop(btn, e) }}>X</button></>
                    })}
                </div>
                {!input.name || !input.summary || !input.title || !input.puntuacion || !input.healthScore || !input.diet || !input.step ? <p>llene bien el formulario</p> : <button className="btn" type="submit">POST!</button>}
            </form>
        </div>
    )
}

