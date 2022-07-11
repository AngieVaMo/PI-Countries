import React from 'react';
import { useEffect, useState } from 'react';
import { Link, /*useNavigate*/ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getOnlyCountries } from '../../Redux/actions/index.js';



function validate(input){
    let errors = {};
    if(!input.name){
      errors.name = "Activity name is required";
    }
    if(!input.span){
      errors.span = "Activity span is required";
      }
  
    return errors;
}


export default function CreateActivity(){
    const dispatch = useDispatch();
   // const goBack = useNavigate();
    const onlyCountries = useSelector((state) => state.onlyCountries);
    const [errors, setErrors] = useState({
        name: "activity is required",
        span: ""
    });
    const [input, setInput] = useState({
        name:"",
        difficulty: "",
        span:"",
        season: "",
        country: []
    })


    useEffect(() => {
        dispatch(getOnlyCountries())
    },[])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) ;
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }));
    }


    function handleCheck(e){
        setInput({
            ...input,
            season: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelect(e){
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleDelete(el){
        setInput({
            ...input,
            country: input.country.filter(c => c !== el)
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input))

        setInput({
            nameActivity: "",
            difficulty: "",
            span: "",
            season: "",
            country: []
          })
      
          alert("Se creo la actividad");
          
          //goBack('/home')
    }


    return (
        <div>
            <h1>Create Touristic Activity</h1>

            <form onSubmit={e => handleSubmit(e)}>

              <div>
               <label>Touristic Activity: </label>
               <input 
               type= "text"
               value= {input.name}
               name= "name"
               onChange={(e)=> handleChange(e)} 
               />
               {errors.name && (<p>{errors.name}</p>)}
              </div>

              <div>
              <label>Difficulty: </label>
              |<input 
              type= "radio"
              value= "1"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />1|
              |<input 
              type= "radio"
              value= "2"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />2|
              |<input 
              type= "radio"
              value= "3"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />3|
              |<input 
              type= "radio"
              value= "4"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />4|
              |<input 
              type= "radio"
              value= "5"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />5|
              </div>

              <div>
              <label>Duración:</label>
              <input 
              type= "text"
              value= {input.span}
              name= "span"
              onChange={(e)=> handleChange(e)}
              placeholder="Tiempo en horas"
              />
              {errors.span && (<p>{errors.span}</p>)}
              </div>

              <div>
              <label>Season:</label>
              <select onChange={(e)=> handleCheck(e)}>
              <option disable hidden>Season</option>
              <option value= "summer">Summer</option>
              <option value= "autumn">Autumn</option>
              <option value= "winter">Winter</option>
              <option value= "spring">Spring</option>
              </select>
              </div>

              <div>
              <label>Countries:  
              <select onChange={(e)=> handleSelect(e)}>
              <option disable hidden>Countries</option>
              {onlyCountries.map((c)=> (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
              </select>
              </label>
              </div>

            {input.country.map(el => 
            <div key={el}>
            <h4>{el}</h4>
            <button onClick={()=> handleDelete(el)}>x</button>
            </div>)}

              <div>
              <button type='submit' disabled={errors.name || errors.span ? true : false}>Create</button>
              </div>

            </form>

            <div><Link to='/home'>❮❮ Regresar</Link></div>

        </div>        
    );
}