import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";



export default function LandingPage(){

    return(
        <div className="landing">   
            <h1 className="landingtitle">WELCOME TO COUNTRIES APP</h1>
            <br/>
            <Link to= "/home">
                <button className="landingbutton">Let's get started</button>
            </Link>
            
        </div>
    );
}