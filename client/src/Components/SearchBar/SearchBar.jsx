import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../Redux/actions/index.js";


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");



    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            alert("Please, type a country name")

        } else{
            dispatch(getCountryByName(name));
            
        }
    }

    return (
        <div>
        
                <input 
                type="text" 
                placeholder="Country name..." 
                onChange={(e)=>handleChange(e)}
                />
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button> 
                
                
            
        </div>
    )
}