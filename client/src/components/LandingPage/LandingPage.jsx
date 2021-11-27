import React from "react";
import { Link } from "react-router-dom";
import "./landing.css"

export default function LandingPage(){
    return (
        <div className="landing-background"> 
            <h1 className="title">LANDING PAGE</h1>
            
            <Link to="/home"><button className="b">GO HOME</button> </Link>
            
        </div>
    )
}