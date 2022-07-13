import {
  GET_COUNTRY,
  GET_COUNTRY_BY_NAME,
  GET_DETAILS,
  ORDER_BY_COUNTRY,
  FILTER_BY_CONTINENT,
  ORDER_BY_POPULATION,
  GET_ONLY_COUNTRIES,
  GET_ACTIVITY,
  COUNTRY_BY_ACTIVITY
} from "../actions/index.js";

const initialState = {
    country: [],
    allCountries: [],
    details: {},
    onlyCountryNames: [],
    activity: [],
}

function reducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload,
                allCountries: action.payload             
            };
        
        case GET_COUNTRY_BY_NAME:
          console.log(action.payload, "COUNTRYBYNAME")

            return{
                ...state,
                allCountries: action.payload 
            };

        case GET_DETAILS:
            return{
                ...state,
                details: action.payload
            };

        case ORDER_BY_COUNTRY:
            let countriesSorted = action.payload === 'asc' ?
            state.allCountries.sort(function (a,b) {
              if (a.name > b.name){
                return 1;
              }
              if (b.name > a.name){
                return -1;
              }
              return 0;
            }) :
            state.allCountries.sort(function (a,b) {
              if (a.name > b.name){
                return -1;
              }
              if (b.name > a.name){
                return 1;
              }
              return 0;
            })
            return {
              ...state,
              allCountries: countriesSorted
            }

        case FILTER_BY_CONTINENT:
           let CountriesByContinent = state.country;
           let filteredByContinent = action.payload === "All" ? CountriesByContinent : CountriesByContinent.filter(c => c.continent === action.payload);
           return{
            ...state,
            allCountries: filteredByContinent
           }

        case ORDER_BY_POPULATION:
          let sortedByPopulation = action.payload === "low to high" ?
          state.allCountries.sort((a, b) => {
            return a.population - b.population
          }) :
          state.allCountries.sort((a,b) => {
            return b.population - a.population
          })
          return{
            ...state,
            allCountries: sortedByPopulation
          }
        
        case GET_ONLY_COUNTRIES:
          console.log(action.payload, "ONLY_COUNTRY_NAMES")
          return{
            ...state,
            onlyCountryNames: action.payload
          }
        
        case GET_ACTIVITY:
          return{
            ...state,
            activity: action.payload
          }

        case COUNTRY_BY_ACTIVITY:
          console.log(state.allCountries, "ALLCOUNTRIES")
          let country = state.country;
          let filteredByActivity = action.payload === "All" ? country : country.filter(c => c.Activities?.find(a => a.name === action.payload));
          return{
            ...state,
            allCountries: filteredByActivity
          }

        default:
          return state;
    }
}

export default reducer;