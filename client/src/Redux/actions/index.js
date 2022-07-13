import axios from 'axios';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const GET_DETAILS = 'GET_DETAILS';
export const ORDER_BY_COUNTRY = 'ORDER_BY_COUNTRY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const GET_ONLY_COUNTRIES = 'GET_ONLY_COUNTRIES';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const COUNTRY_BY_ACTIVITY = 'COUNTRY_BY_ACTIVITY';

export function getCountry(){
    return async function(dispatch) {
        try {
            let country = await axios.get("http://localhost:3001/country");

        return dispatch({
            type: "GET_COUNTRY",
            payload: country.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCountryByName(name){
    return async function(dispatch) {
        try {
            let countryByName = await axios.get(`http://localhost:3001/country?name=${name}`);
            console.log(countryByName, "countrybyName")

             dispatch({
              type: "GET_COUNTRY_BY_NAME",
              payload: countryByName.data
            })

        } catch (error) {
            console.log(error)
            alert("Country not found")
        }
    }
}

export function getDetails(id) {
    return async function(dispatch) {
        try {
            let details = await axios.get(`http://localhost:3001/country/${id}`)
            console.log(details, "detalles")

            return dispatch({
                type: "GET_DETAILS",
                payload: details.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByCountry(payload){
    return{
        type: "ORDER_BY_COUNTRY",
        payload
    }
}

export function filterByContinent(payload){
    return {
      type: "FILTER_BY_CONTINENT",
      payload
    }
  }
  
  export function orderByPopulation(payload){
    return {
      type: "ORDER_BY_POPULATION",
      payload
    }
  }

  export function getOnlyCountries(){
    return async function(dispatch) {
        try {
            let onlyCountries = await axios.get("http://localhost:3001/countriesList")
            console.log(onlyCountries, "COUNTRYNAME")

            return dispatch({
                type: "GET_ONLY_COUNTRIES",
                payload: onlyCountries.data
            })

        } catch (error) {
            console.log(error)
        }
    }
  }

  export function postActivity(payload){
    return async function(dispatch){
        try {
            let activity = await axios.post("http://localhost:3001/activity", payload)
            

            return dispatch({
                type: "GET_ACTIVITY",
                payload: activity.data
            })

        } catch (error) {
            console.log(error)
        }
    }
  }

  export function getActivity(){
    return async function(dispatch){
        try {
            let activity = await axios.get("http://localhost:3001/activity")
            console.log(activity, "ACTIVITIES")

            return dispatch({
                type: "GET_ACTIVITY",
                payload: activity.data
            })

        } catch (error) {
            console.log(error)
        }
    }
  }

  export function countryByActivity(payload){
    console.log("pay " + payload);
    return {
        type: "COUNTRY_BY_ACTIVITY",
        payload
    }
  }


