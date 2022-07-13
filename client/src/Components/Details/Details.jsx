import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from "../../Redux/actions/index.js";


export default function Details(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const countryDetail = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
    },[])

    return(
        <div>
            {
              countryDetail?.hasOwnProperty("name") &&
              <div>
                <div>
                  <img src={countryDetail.flag} alt= "Bandera"/>
                  <h2>{countryDetail.name}</h2>
                  <h3><i>Capital:</i> {countryDetail.capital[0]}</h3>
                  <h4><i>Code:</i> {countryDetail.id}</h4>
                  <h4><i>Subregion:</i> {countryDetail.subregion}</h4>
                  <h4><i>Area:</i> {parseInt(countryDetail.area).toLocaleString('de-DE')} Km2</h4>
                  <h4><i>Population:</i> {countryDetail.population.toLocaleString('de-DE')}</h4>
              </div>
              <div>
                 <h2><i>Touristic Activities:</i></h2>
                 <br/>
                 {
                    countryDetail.Activities?.length === 0 ?
                    <h2>¡It has no activities!</h2> :
                    countryDetail.Activities?.map(act => (
                        <p key={act.id}>
                          <li>Activity: {act.name}</li>
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
                <Link to="/home">❮❮ Back</Link>
            </div>

        </div>
    )
}