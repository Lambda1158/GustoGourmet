import React, {useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import { postRecipe,getDiets } from "../actions";
import { useDispatch,useSelector } from "react-redux";
export default function CreateRecipe(){
    const dispatch =useDispatch()
    const diets=useSelector(state=>state.diets)
    const [input,setInput]=useState({
        name:"",
        resumen:"",
        puntuacion:0,
        level:"",
        step:"",
        diet:[],
        image:"",
        title:"",
        healhScore:0,
        dishTypes:[]
    })

    return(
        <div>
            <Link to="/home">volver al home</Link>
            me renderize?
        </div>
    )
}

