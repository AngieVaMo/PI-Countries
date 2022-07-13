import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getOnlyCountries } from '../../Redux/actions/index.js';



function validate(input){
    let errors = {};
    
    if(!input.name){
      errors.name = "Activity name is required";
    }

    if(!input.difficulty){
        errors.difficulty = "Difficulty is required";
    }

    if(!input.span){
      errors.span = "Activity span is required";
    } else if(input.span.length !== 4){
        errors.span = "should have 3 characters (e.g: 2 hr)";
    }

    if(!input.season){
        errors.season = "Season is required";
    }

    if(input.countries.length === 0){
        errors.countries = "should add at least one country to the activity";
    }
  
    return errors;
}


export default function CreateActivity(){
    const dispatch = useDispatch();
    const goBack = useNavigate();
    const onlyCountries = useSelector((state) => state.onlyCountryNames);
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        span: "",
        season: "",
        countries: ""
    });
    const [input, setInput] = useState({
        name:"",
        difficulty: "",
        span:"",
        season: "",
        countries: []
    })


    useEffect(() => {
        dispatch(getOnlyCountries())
    },[])

    useEffect(() => {
        setErrors(validate(input))
      }, [dispatch, input])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) ;
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
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
            countries: [...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleDelete(el){
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== el)
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        setErrors(validate(input))
        if(Object.keys(errors).length === 0){
            dispatch(postActivity(input))
            alert("Activity succesfullly created :)");
            setInput({
                nameActivity: "",
                difficulty: "",
                span: "",
                season: "",
                country: []
            })
            goBack('/home')

        } else{
            alert("Some data is missing");

        }       
    }

    return (
        <div>
            <h1>Create Touristic Activity</h1>

            <form onSubmit={e => handleSubmit(e)}>

              <div>
               <label>Activity name: </label>
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
              {errors.difficulty && (<p>{errors.difficulty}</p>)}
              </div>

              <div>
              <label>Span:</label>
              <input 
              type= "text"
              value= {input.span}
              name= "span"
              onChange={(e)=> handleChange(e)}
              placeholder="Time in hours... eg: 2 hr"
              />
              {errors.span && (<p>{errors.span}</p>)}
              </div>

              <div>
              <label>Season:</label>
              <select onChange={(e)=> handleCheck(e)}>
              <option hidden>Select</option>
              <option value= "summer">Summer</option>
              <option value= "autumn">Autumn</option>
              <option value= "winter">Winter</option>
              <option value= "spring">Spring</option>
              </select>
              {errors.season && (<p>{errors.season}</p>)}
              </div>

              <div>
              <label>Countries: </label> 
              <select onChange={(e)=> handleSelect(e)}>
              <option hidden>Select</option>
              {onlyCountries?.map(c => {
                return (
                    <option key={c.name} value={c.name}>{c.name}</option>
                )
               })
              }
              </select>
              {errors.countries && (<p>{errors.countries}</p>)}
              </div>

              {input.countries?.map(el => {
                return (
                    <div key={el}>
                    <h4>{el}</h4>
                    <button onClick={() => handleDelete(el)}>x</button>
                    </div>
                )
               })
              }

              <div>
              <button type='submit' disabled={errors.name || errors.difficulty || errors.span || errors.season || errors.countries ? true : false}>Create</button>
              </div>

            </form>

            <div><Link to='/home'>❮❮ Back</Link></div>

        </div>        
    );
}