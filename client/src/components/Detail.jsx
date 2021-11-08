import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

const Detail= (props)=>{
    let id=props.match.params.id
    let flag=props.match.params.flag
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getDetail(id,flag))
    },[])
    const myRecipe= useSelector((state)=>state.detail)
    console.log(myRecipe[0]?.analyzedInstructions)
    



    return(
        <div>
            {myRecipe[0]?
            <div>
                <h1>{myRecipe[0].title}</h1>
                <img src={myRecipe[0].image} alt="no cargo :c" height="200px" width="200px"/>
                <h2>{myRecipe[0].createdInBd?myRecipe[0].diets.map(e=>e.name +" "):myRecipe[0].diets? myRecipe[0].diets.map(e=>e+" "):"dietas viene null de la api"}</h2>
                <ul>
                    <li>{myRecipe[0].puntuacion}</li>
                    <li>{myRecipe[0].healthScore}</li>
                </ul>
                <h3>{myRecipe[0].createdInBd?myRecipe[0].dishTypes : myRecipe[0].dishTypes?.map(e=>e+" ")}</h3>
                <div dangerouslySetInnerHTML={{ __html:myRecipe[0].summary }} />
                <p>{myRecipe[0].createdInBd? myRecipe[0].step : myRecipe[0].analyzedInstructions.map(e=> e +"  ")}</p>
            </div>
            : <p>Loading ...</p>}
            <Link to="/home">take me back</Link>
        </div>
    )
}
export default Detail