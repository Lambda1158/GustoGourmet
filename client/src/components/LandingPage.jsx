import React from "react";
import { Link } from "react-router-dom";
import "./css/landing.css"

export default function LandingPage(){
    return (
        <div className="landing"> 
            <h1 className="title">LANDING PAGE</h1>
            
            <Link to="/home"><button className="b">GO HOME</button> </Link>
            
        </div>
    )
}