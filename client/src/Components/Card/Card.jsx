import { React } from "react";
import { NavLink } from "react-router-dom";
import "./Card.css"



export default function Card({name, continent, flag, id}){
    

    return(
        <div className="card">
            <NavLink className="link" to={`/country/${id}`}>
             <img className="img" src={flag} alt="Bandera del país"/>
             <h2 className="h2">{name}</h2>
             <h4 className="h4">{continent}</h4>
            </NavLink>
        </div>
    )
}


