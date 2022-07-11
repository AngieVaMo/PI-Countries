import React from "react";
import { Link } from 'react-router-dom';



export default function LandingPage(){

    return(
        <div>
            <h1>WELCOME TO COUNTRIES APP</h1>
            <Link exact to= "/home">
                <button>Get started</button>
            </Link>
        </div>
    );
}