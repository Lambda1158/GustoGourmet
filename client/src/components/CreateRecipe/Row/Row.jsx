import React, { useState } from "react";
import "../Row/Row.css"
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
            {value ? <span className="corret">{`${props.name} valido`}</span> : <span className="incorrect">{`${props.name} no valido`}</span>}
        </div>
    )
}