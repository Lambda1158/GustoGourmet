import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <h1 className="title">LANDING PAGE</h1>
            <Link to="/home" class="title"><botton>GO TO HOME</botton> </Link>
            
        </div>
    )
}