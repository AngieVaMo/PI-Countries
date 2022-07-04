import React from "react";


export default function LandingPage(){

    return(
        <div>
            <h1>WELCOME TO COUNTRIES API</h1>
            <Link exact to= "/home">
                <button>Ir al home</button>
            </Link>
        </div>
    );
}