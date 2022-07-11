import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../Redux/actions/index.js";


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("");



    function handleChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            alert("Escriba por favor un nombre de país válido.")
        } else{
            dispatch(getCountryByName(name))
            setCurrentPage(1);
        }
    }

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input 
                type={"text"} 
                placeholder="Country name..." 
                value={name} 
                onChange={(e)=>handleChange(e)}
                />
                <input 
                type={"submit"} 
                value={"Search"}
                />
            </form>
        </div>
    )
}