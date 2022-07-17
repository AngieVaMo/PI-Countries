import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getOnlyCountries } from '../../Redux/actions/index.js';
import "./CreateActivity.css";


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
        errors.countries = "Should add at least one country to the activity";
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
        if(input.countries.includes(e.target.value)) {
            return;
            
        } else{
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

        }
        
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
        <div className='containercreateact'>
            <div className='backform'>
                <Link className='backlinkform' to='/home'>❮❮ Back</Link>
            </div>

            <h2 className='titlecreateact'>Create Touristic Activity</h2>

          <div className='formcontainer'>

            <form onSubmit={e => handleSubmit(e)}>

              <div className='fields'>
               <label>Activity name: </label>
               <input className='inputs'
               type= "text"
               value= {input.name}
               name= "name"
               onChange={(e)=> handleChange(e)} 
               />
               {errors.name && (<p className='p'>{errors.name}</p>)}
              </div>

              <div className='fields'>
              <label>Difficulty: </label>
              |<input className='inputs'
              type= "radio"
              value= "1"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />1|
              |<input className='inputs'
              type= "radio"
              value= "2"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />2|
              |<input className='inputs'
              type= "radio"
              value= "3"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />3|
              |<input className='inputs'
              type= "radio"
              value= "4"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />4|
              |<input className='inputs'
              type= "radio"
              value= "5"
              name= "difficulty"
              onChange={(e)=> handleChange(e)}
              />5|
              {errors.difficulty && (<p className='p'>{errors.difficulty}</p>)}
              </div>

              <div className='fields'>
              <label>Span: </label>
              <input className='inputs'
              type= "text"
              value= {input.span}
              name= "span"
              onChange={(e)=> handleChange(e)}
              placeholder="Time in hours... eg: 2 hr"
              />
              {errors.span && (<p className='p'>{errors.span}</p>)}
              </div>

              <div className='fields'>
              <label>Season:</label>
              <select className='inputs' onChange={(e)=> handleCheck(e)}>
              <option hidden>Select</option>
              <option value= "summer">Summer</option>
              <option value= "autumn">Autumn</option>
              <option value= "winter">Winter</option>
              <option value= "spring">Spring</option>
              </select>
              {errors.season && (<p className='p'>{errors.season}</p>)}
              </div>

              <div className='fields'>
              <label>Countries: </label> 
              <select className='inputs' onChange={(e)=> handleSelect(e)}>
              <option hidden>Select</option>
              {onlyCountries?.map(c => {
                return (
                    <option key={c.name} value={c.name}>{c.name}</option>
                )
               })
              }
              </select>
              {errors.countries && (<p className='p'>{errors.countries}</p>)}
              </div>

              <div className='countries'>
              {input.countries?.map(el => {
                return (
                    <div className='country' key={el}>
                    <p className='pais'>{el}</p>
                    <button className='deletecountry' onClick={() => handleDelete(el)}>x</button>
                    </div>
                )
               })
              }
              </div>

              <div className='fields'>
              <button className='create' type='submit' disabled={errors.name || errors.difficulty || errors.span || errors.season || errors.countries ? true : false}>Create</button>
              </div>

            </form>
          </div>

        </div>        
    );
}