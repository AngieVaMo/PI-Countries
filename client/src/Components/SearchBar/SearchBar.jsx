import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../Redux/actions/index.js";
import "./SearchBar.css";


export default function SearchBar({ setter }){
    const dispatch = useDispatch();
    const [name, setName] = useState("");



    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        setter();
        if(!name){
            alert("Please, type a country name")

        } else{
            dispatch(getCountryByName(name));
            
        }
    }

    return (
        <div className="searchBar">
            <input className="input"
            type="text" 
            placeholder="Country name..." 
            value={name}
            onChange={(e)=>handleChange(e)}
            />
            <button className="button" type="submit" onClick={(e)=>handleSubmit(e)}>Search</button> 
        </div>
    )
}