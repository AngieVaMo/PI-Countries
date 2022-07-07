import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../Redux/actions.js";


export default function SearchBar({setCurrentPage}){
    const [name, setName] = useState("");

    const dispatch = useDispatch();

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
                placeholder="Nombre del país..." 
                value={name} 
                onChange={(e)=>handleChange(e)}
                />
                {error ? <span>{error}</span> : null}
                <input 
                type={"submit"} 
                value={"Buscar"}
                />
            </form>
        </div>
    )

    
}