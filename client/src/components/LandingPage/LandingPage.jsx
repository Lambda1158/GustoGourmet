import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing-background">
      <h1 className="title">Bienvenido a GustoGourmet</h1>
      <Link to="/home">
        <button className="b1">Let's begin</button>
      </Link>
    </div>
  );
}
