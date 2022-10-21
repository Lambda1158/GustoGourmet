import React, { useState } from "react";
import "../../CreateRecipe/createrecipe.css"
export default function Row(props) {
    const [value, setValue] = useState("")
    const change = e => {
        e.preventDefault()
        setValue(e.target.value)
        props.onChange(e)
    }
    return (
        <div className="create-recipe">
            <label>{props.name}</label>
            <br></br>
            <input
                id={Math.floor(Math.random() * 10)}
                type="text"
                value={value}
                name={props.name === "healthScore" ? "healthScore" : props.name.toLowerCase()}
                onChange={e => change(e)}
            />
            {value ? <p>{`${props.name} valido`}</p> : <p>{`${props.name} no valido`}</p>}
        </div>
    )
}