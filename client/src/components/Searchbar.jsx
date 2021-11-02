import React from "react";
import { Link } from "react-router-dom";
export default function Searchbar(){
    return (
        <div>
            <h1>La nav bar</h1>
            <Link to="/">take me back to Landingpage</Link>
            <selector>
                <option value="asc">ascendente</option>
                <option value="des">descendente</option>
            </selector>
            <form>
                <input type="checkbox" id="vegan" value="vegan" /><label for="vegan">Vegan</label>
                <input type="checkbox" id="vegetarian" value="vegetarian" /><label for="vegan">Vegetarian</label>
            </form>
        </div>
        
    )
}