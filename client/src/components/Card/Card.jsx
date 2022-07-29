import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"

import "./card.css"
import { deleteRecipe } from "../../actions";
export default function Card({ title, image, diets, puntuacion, id, createdInBd }) {
    const dispatch = useDispatch()
    console.log(puntuacion)
    function handleDelete(e) {
        dispatch(deleteRecipe(e.target.value))
    }
    if (typeof diets[0] === "object") {
        diets = diets.map(e => e.name)
    }
    return (
        <div className="card">
            <div className="body">
                <div className="t2"><img className="img" src={image} alt="img not found" /></div>
                <div className="t1"><h3 className="card_title" >{title}</h3></div>
                <span >Puntuacion: {puntuacion} </span>
                {diets ? diets.map((e) => {
                    return <p>{e}</p>
                }) : <p key={id}>No Diets :P</p>}

                <Link className="link" to={`/detail/${id},${createdInBd ? 1 : 0}`}><button className="btn">More info</button></Link>
                <button value={id} className="btn btn-outline" onClick={e => handleDelete(e)}>X</button>

            </div>
        </div>


    )
}