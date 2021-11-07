import React, {useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import { postRecipe,getDiets } from "../actions";
import { useDispatch,useSelector } from "react-redux";
export default function CreateRecipe(){
    const dispatch =useDispatch()
    const history=useHistory()
    const [error,setError]=useState({})
    const diets=useSelector(state=>state.diets)
    const [input,setInput]=useState({
        name:"",
        title:"",
        summary:"",
        puntuacion:0,
        step:"",
        diet:[],
        image:"",
        healhScore:0,
        dishtext:"",
        dishTypes:[]
    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    function handleCheck(e){
            setInput({
                ...input,
                diet:[...input.diet,e.target.value]
            })
        
    }
    function handleDish(e){
        e.preventDefault()
        let aux=input.dishtext
        setInput({
            ...input,
            dishTypes:[...input.dishTypes,aux],
            dishtext:""
        })
        
        
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postRecipe(input))
        alert("Recipe creada , anda a buscarla al home :D")
        history.push("/home")
    }


    return(
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Create your own unique recipe</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={input.title}
                        name="title"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Summary</label>
                    <input
                        type="text"
                        value={input.sumary}
                        name="summary"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Puntuacion</label>
                    <input
                        placeholder=" lala"
                        type="number"
                        value={input.puntuacion}
                        name="puntuacion"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>healthScore</label>
                    <input
                        type="number"
                        value={input.healhScore}
                        name="healhScore"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Paso a Paso</label>
                    <input
                        type="text"
                        value={input.step}
                        name="step"
                        onChange={e=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={e=>handleChange(e)}
                        placeholder="url or empty"
                    />
                </div>
                <div>
                    <label>Diets</label>
                    <select onChange={e=>handleCheck(e)}>
                    <option type="checkbox" id="vegan" value="6">Vegan</option>
                    <option type="checkbox" id="vegetarian" value="3" >Vegetarian</option>
                    <option type="checkbox" id="Gluten Free" value="1" >Gluten Free</option>
                    <option type="checkbox" id="Ketogenic" value="2">Ketogenic</option>
                    <option type="checkbox" id="Lacto-Vegetarian" value="4">Lacto-Vegetarian</option>
                    <option type="checkbox" id="Ovo-Vegetarian" value="5" >Ovo-Vegetarian</option>
                    <option type="checkbox" id="pescatarian" value="7">Pescatarian</option>
                    <option type="checkbox" id="Paleo" value="8" >Paleo</option>
                    <option type="checkbox" id="Primal" value="9" >Primal</option>
                    <option type="checkbox" id="Low-FODMAP" value="10" >Low-FODMAP</option>
                    <option type="checkbox" id="Whole30" value="11">Whole30</option>
                    <option type="checkbox" id="Dairy Free" value="12">Dairy Free</option>
                    <option type="checkbox" id="lacto ovo vegetarian" value="13">lacto ovo vegetarian</option>
                    </select>
                    <ui><li>{input.diet.map(e=>e + " , ")}</li></ui>
                </div>
                <div>
                    <label>DishType</label>
                    <input
                        type="text"
                        value={input.dishtext}
                        name="dishtext"
                        onChange={e=>handleChange(e)}
                    />
                    <button onClick={e=>handleDish(e)} >Push dish</button>
                    <p>{input.dishTypes.map(e=>e+" , ")}</p>
                </div>
                
                <button type="submit">POST!</button>
            </form>
        </div>
    )
}

