import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from "../../Redux/actions/index.js";
import "./Details.css";


export default function Details(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const countryDetail = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
    },[])

    return(
        <div className='container'>
            {
              countryDetail?.hasOwnProperty("name") &&
              <div>
                <div className='carddetail'>
                  <img src={countryDetail.flag} alt= "Bandera"/>
                  <h2 className='h2'><i>{countryDetail.name}</i></h2>
                  <h3 className='h3'><i>Capital:</i> {countryDetail.capital[0]}</h3>
                  <h4 className='h'><i>Code:</i> {countryDetail.id}</h4>
                  <h4 className='h'><i>Subregion:</i> {countryDetail.subregion}</h4>
                  <h4 className='h'><i>Area:</i> {parseInt(countryDetail.area).toLocaleString('de-DE')} Km2</h4>
                  <h4 className='h'><i>Population:</i> {countryDetail.population.toLocaleString('de-DE')}</h4>
              </div>
              <div>
                 <h2 className='title'><i>Touristic Activities:</i></h2>
                 {
                    countryDetail.Activities?.length === 0 ?
                    <h2>¡It has no activities!</h2> :
                    countryDetail.Activities?.map(act => (
                        <p className='cardactivities' key={act.id}>
                          <li>Activity: <strong>{act.name}</strong></li>
                          <li>Difficulty: {act.difficulty}</li>
                          <li>Span: {act.span}</li>
                          <li>Season: {act.season}</li>
                          <br/>
                        </p>
                    )) 
                    
                 }
              </div>
              </div> 
              //: <p>Details not found</p>
            }

            <div>
                <Link className='back' to="/home">❮❮ Back</Link>
            </div>

        </div>
    )
}