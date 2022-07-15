import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";



export default function LandingPage(){

    return(
        <div className="landing">   
         
            {/*<img className="img" src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Landing Page"/>*/}
            <h1 className="landingtitle">WELCOME TO COUNTRIES APP</h1>
            <br/>
            <Link to= "/home">
                <button className="landingbutton">Let's get started</button>
            </Link>
            
        </div>
    );
}