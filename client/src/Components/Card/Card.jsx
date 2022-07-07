import { React } from "react";
import { Link } from "react-router-dom";



export default function Card({name, continent, flag, id}){
    return(
        <div>
            <Link to={`/Country/${id}`}>

            <img src={flag} alt="Bandera del país"/>
            <h2>{name}</h2>
            <h4>{continent}</h4>
            
            </Link>
        </div>
    )
}