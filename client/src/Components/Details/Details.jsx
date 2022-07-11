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
        <div DETALLES>
            {
              countryDetail.hasOwnProperty("name") ?
              <div>
                <div>
                  <img src={countryDetail.flag} alt= "Bandera"/>
                  <h2>{countryDetail.name}</h2>
                  <h3><i>Capital</i> {countryDetail.capital[0]}</h3>
                  <h4><i>Codigo:</i> {countryDetail.id}</h4>
                  <h4><i>Subregión:</i> {countryDetail.subregion}</h4>
                  <h4><i>Área:</i> {parseInt(countryDetail.area).toLocaleString('de-DE')} Km2</h4>
                  <h4><i>Población:</i> {countryDetail.population.toLocaleString('de-DE')}</h4>
              </div>
              <div>
                 <h2><i>Touristic Activities:</i></h2>
                 <br/>
                 {
                    countryDetail.activity?.length > 0 ?
                    countryDetail.activity.map(act => (
                        <p key={act.id}>
                          <li>Activity: {act.name}</li>
                          <li>Season: {act.season}</li>
                          <li>Duration: {act.span}</li>
                          <li>Difficulty: {act.difficulty}</li>
                          <br/>
                        </p>
                    )) :
                    <h2>¡It has no activities!</h2>
                 }
              </div>
              </div> : <p>Loading...</p>
            }

            <div>
                <Link to="/home">❮❮ Return</Link>
            </div>

        </div>
    )
}