import React from "react";
import { usestate } from "react";
import { useDispatch } from "react-redux";


export default function SearchBar(){
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
            dispatchEvent()
            //setCurrentPage(1);
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