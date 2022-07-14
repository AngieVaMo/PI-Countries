import { React } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import{
    getCountry,
    orderByCountry,
    filterByContinent,
    orderByPopulation,
    getActivity,
    countryByActivity
} from "../../Redux/actions/index.js";
import Card from "../Card/Card.jsx";
import Pages from "../Pages/Pages.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx"
import { Link } from "react-router-dom";
import "./Home.css";



export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);
    const allActivities = useSelector(state => state.activity);
    console.log(allActivities, "ACTIVIDADESHOME")
    const activityName = Array.isArray(allActivities) ? allActivities.map(a => a.name): []
    const [currentPage, setCurrentPage] = useState(1);
    const [countryPerPage] = useState(10);
    const [,setInOrder] = useState('');



    const indexOfLastCountry = currentPage * countryPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
    const CountriesOnCurrentPage = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);



    function paging(pageNum){
        setCurrentPage(pageNum);
        /*if(pageNum === 1){
            setCountryPerPage(9);
            
        } else{
            setCountryPerPage(10);
        }*/
    }

    useEffect(() => {
        dispatch(getCountry());
        dispatch(getActivity());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountry());
        dispatch(getActivity())
        window.location.reload();
    }

    function handleFilterByContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
        
    }

    function handleSortCountry(e) {
        e.preventDefault();
        dispatch(orderByCountry(e.target.value));
        setCurrentPage(1);
        setInOrder(`Ordered by the alphabeth ${e.target.value}`);
    }

    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setInOrder(`Ordered by population ${e.target.value}`)
    }

    function handleCountryByActivity(e) {
        e.preventDefault();
        dispatch(countryByActivity(e.target.value))
        setCurrentPage(1);
        setInOrder(`Ordered by activity ${e.target.value}`)
    }



    return(
        <div className="container">
            <div>
              <SearchBar/>
            </div>

            <div className="allfilters">
                <div >
                    <h3 className="searchby">Search by:</h3>
                </div>
                <div>
                    <select onChange = {e => handleSortCountry(e)}>
                        <option>Sort by alphabet</option>
                        <option value= "asc">A-Z</option>
                        <option value= "desc">Z-A</option>
                    </select>
                </div>

                <div className="filters">
                    <select onChange={e => handleSortPopulation(e)}>
                     <option>Sort by population</option>
                     <option value='low to high'>smallest to largest population</option>
                     <option value='high to low'>largest to smallest population</option>
                    </select>
                </div>

                <div className="filters">
                    <select onChange={e => handleFilterByContinent(e)}>
                     <option value='All'>Filter by continent</option>
                     <option value='Africa'>Africa</option>
                     <option value='Americas'>America</option>
                     <option value='Antarctic'>Antartic</option>
                     <option value='Asia'>Asia</option>
                     <option value='Europe'>Europe</option>
                     <option value='Oceania'>Oceania</option>    
                    </select>
                </div>

                <div className="filters">
                 {
                 activityName.length === 0 ?
                    <p>No activities created</p>
                  : <select onChange={e => handleCountryByActivity(e)}>
                    <option value='All'>Filter by activities</option>
                  {activityName?.map(e => {
                    return (
                      <option key={e} value={e}>{e}</option>
                    )
                  })}
                  </select>
                }
                </div>

                <div >
                    <button className="clearfilters" onClick={e => handleClick(e)}>Clear filters</button>
                </div>
                
            </div>

            <div className="createact">
                <Link className="createact" to="/createActivity">
                 <p>Create activity</p>
                </Link>
            </div>

            <div className="cards">
                {
                    CountriesOnCurrentPage?.map(c => {
                        return(
                            <Card 
                            name={c.name} 
                            continent={c.continent} 
                            flag={c.flag} 
                            id={c.id} 
                            key={c.id}/>
                        )
                    })
                
                }
            </div>

            <Pages
            countryPerPage={countryPerPage}
            allCountries={allCountries.length}
            paging={paging}
            />
            
        </div>
    )
}