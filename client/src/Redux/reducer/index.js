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
    onlyCountries: [],
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
            state.country.sort(function (a,b) {
              if (a.name > b.name){
                return 1;
              }
              if (b.name > a.name){
                return -1;
              }
              return 0;
            }) :
            state.country.sort(function (a,b) {
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
              country: countriesSorted
            }

        case FILTER_BY_CONTINENT:
           let CountriesByContinent = state.allCountries;
           let filteredByContinent = action.payload === "All" ? CountriesByContinent : CountriesByContinent.filter(c => c.continent === action.payload);
           return{
            ...state,
            allCountries: filteredByContinent
           }

        case ORDER_BY_POPULATION:
          let sortedByPopulation = action.payload === "low" ?
          state.country.sort((a,b) => {
            if(a.population > b.population){
              return 1
            }
            if(b.population > a.population){
              return -1
            }
            return 0
          }) :
          state.country.sort((a,b) => {
            if(a.population < b.population){
              return -1
            }
            if(b.population < a.population){
              return 1
            }
            return 0
          })
          return{
            ...state,
            country: sortedByPopulation
          }
        
        case GET_ONLY_COUNTRIES:
          return{
            ...state,
            onlyCountries: action.payload
          }
        
        case GET_ACTIVITY:
          return{
            ...state,
            activity: action.payload
          }

        case COUNTRY_BY_ACTIVITY:
          let country = state.country;
          let filteredByActivity = action.payload === "All" ? country : country.filter(c => c.activity.find(a => a.name === action.payload));
          return{
            ...state,
            country: filteredByActivity
          }

        default:
          return state;
    }
}

export default reducer;