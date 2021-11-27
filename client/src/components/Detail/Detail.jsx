import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail, resetRecipeDetail } from "../../actions";
import { useEffect } from "react";
import "./detail.css"
import { Spiner } from "../spiner";
const Detail= (props)=>{
    let id=props.match.params.id
    let flag=props.match.params.flag
    const dispatch=useDispatch()
    var cargando=useSelector(state=> state.cargando)
    useEffect(()=>{
        dispatch(getDetail(id,flag))
        return()=>{
            dispatch(resetRecipeDetail())
        }
    },[])
    const myRecipe= useSelector((state)=>state.detail)
    
    function contenido(){
        if(cargando){
            return <Spiner/>
        }
        return(
            <div className="detail-background">
            {myRecipe[0]?
            <div>
                <h1>{myRecipe[0].title}</h1>
                <img src={myRecipe[0].image} alt="no cargo :c" height="400px" width="400px"/>
                <h2>{myRecipe[0].createdInBd?myRecipe[0].diets.map(e=>e.name +" "):myRecipe[0].diets? myRecipe[0].diets.map(e=>e+" "):"dietas viene null de la api"}</h2>
                <ul>
                    <li>Puntuacion: {myRecipe[0].puntuacion}</li>
                    <li>healthScore: {myRecipe[0].healthScore}</li>
                </ul>
                <h3>Dish Types: {myRecipe[0].createdInBd?myRecipe[0].dishTypes : myRecipe[0].dishTypes?.map(e=>e+" ")}</h3>
                <h2>Summary</h2>
                <div dangerouslySetInnerHTML={{ __html:myRecipe[0].summary }} />
                <p>Step by Step: {myRecipe[0].createdInBd? myRecipe[0].step : myRecipe[0].analyzedInstructions.map(e=> e +"  ")}</p>
            </div>
            : <p>Loading ...</p>}
            <Link to="/home"><button className="btn">take me back</button></Link>
        </div>
        )
    }


    return(
        <>
        {contenido()}
        </>
    )
}
export default Detail